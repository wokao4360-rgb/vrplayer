import type { CubeFaceId, CubemapTileManifest, TileManifest } from '../viewer/tileManifest.ts';
import { buildCubeHighTileKeys, buildCubeLowFaceOrder, buildCubeVisibleHighFaces } from '../viewer/cubeTilePolicy.ts';
import { buildCubeHighTileUrl, buildCubeLowFaceUrl } from '../viewer/tileFormatPolicy.ts';
import type { MuseumShellManifest } from './museumShellManifest.ts';

export type MuseumShellPreloadAssetRole =
  | 'museum-cover'
  | 'scene-hires-manifest'
  | 'scene-preview'
  | 'neighbor-preview'
  | 'low-face'
  | 'hero-high-tile'
  | 'remaining-high-tile'
  | 'hero-panorama';

export type MuseumShellPreloadAsset = {
  kind: 'image' | 'json';
  role: MuseumShellPreloadAssetRole;
  url: string;
  sceneId?: string;
  worldFace?: CubeFaceId;
  col?: number;
  row?: number;
};

export type MuseumShellPreloadPlan = {
  L0: MuseumShellPreloadAsset[];
  L1: MuseumShellPreloadAsset[];
  L2: MuseumShellPreloadAsset[];
  L3: MuseumShellPreloadAsset[];
};

type BuildMuseumShellPreloadPlanArgs = {
  museum: MuseumShellManifest;
  sceneId: string;
  phase: 'museum-entry' | 'scene-transition';
  view: {
    yaw: number;
    pitch: number;
    fov: number;
  };
  hiresManifestBySceneId?: Record<string, TileManifest | undefined>;
};

const CUBE_FACE_ORDER: CubeFaceId[] = ['f', 'r', 'b', 'l', 'u', 'd'];

export function buildMuseumShellPreloadPlan({
  museum,
  sceneId,
  phase,
  view,
  hiresManifestBySceneId = {},
}: BuildMuseumShellPreloadPlanArgs): MuseumShellPreloadPlan {
  const scene = museum.scenes.find((item) => item.id === sceneId);
  if (!scene) {
    throw new Error(`scene ${sceneId} not found in museum ${museum.id}`);
  }

  const L0: MuseumShellPreloadAsset[] = [];
  const L1: MuseumShellPreloadAsset[] = [];
  const L2: MuseumShellPreloadAsset[] = [];
  const L3: MuseumShellPreloadAsset[] = [];

  if (scene.hires?.format === 'tile-manifest') {
    L0.push({
      kind: 'json',
      role: 'scene-hires-manifest',
      url: scene.hires.manifestUrl,
      sceneId: scene.id,
    });
  }

  L1.push({
    kind: 'image',
    role: 'scene-preview',
    url: scene.preview.url,
    sceneId: scene.id,
  });

  for (const neighborId of scene.neighbors) {
    const neighborScene = museum.scenes.find((item) => item.id === neighborId);
    if (!neighborScene) continue;
    L1.push({
      kind: 'image',
      role: 'neighbor-preview',
      url: neighborScene.preview.url,
      sceneId: neighborScene.id,
    });
  }

  if (scene.hires?.format === 'panorama') {
    L2.push({
      kind: 'image',
      role: 'hero-panorama',
      url: scene.hires.url,
      sceneId: scene.id,
    });
    return {
      L0: dedupeAssets(L0),
      L1: dedupeAssets(L1),
      L2: dedupeAssets(L2),
      L3,
    };
  }

  const hiresManifest = hiresManifestBySceneId[scene.id];
  if (!hiresManifest || hiresManifest.type !== 'cubemap-tiles') {
    return {
      L0: dedupeAssets(L0),
      L1: dedupeAssets(L1),
      L2,
      L3,
    };
  }

  appendCubemapAssets(L2, L3, scene.id, hiresManifest, view);
  return {
    L0: dedupeAssets(L0),
    L1: dedupeAssets(L1),
    L2: dedupeAssets(L2),
    L3: dedupeAssets(L3),
  };
}

function appendCubemapAssets(
  L2: MuseumShellPreloadAsset[],
  L3: MuseumShellPreloadAsset[],
  sceneId: string,
  manifest: CubemapTileManifest,
  view: { yaw: number; pitch: number; fov: number },
): void {
  const tileFormat = manifest.tileFormat ?? 'avif';
  const lowFaces = buildCubeLowFaceOrder({ yawDeg: view.yaw, pitchDeg: view.pitch });
  for (const worldFace of lowFaces) {
    L2.push({
      kind: 'image',
      role: 'low-face',
      url: buildCubeLowFaceUrl(manifest.baseUrl, worldFace, tileFormat),
      sceneId,
      worldFace,
    });
  }

  const heroFaces = buildCubeVisibleHighFaces({ yawDeg: view.yaw, pitchDeg: view.pitch });
  for (const tile of buildCubeHighTileKeys(heroFaces, manifest.highGrid)) {
    L2.push({
      kind: 'image',
      role: 'hero-high-tile',
      url: buildCubeHighTileUrl(manifest.baseUrl, tile.face, tile.col, tile.row, tileFormat),
      sceneId,
      worldFace: tile.face,
      col: tile.col,
      row: tile.row,
    });
  }

  const remainingFaces = resolveRemainingFaces(manifest.faces, heroFaces);
  for (const tile of buildCubeHighTileKeys(remainingFaces, manifest.highGrid)) {
    L3.push({
      kind: 'image',
      role: 'remaining-high-tile',
      url: buildCubeHighTileUrl(manifest.baseUrl, tile.face, tile.col, tile.row, tileFormat),
      sceneId,
      worldFace: tile.face,
      col: tile.col,
      row: tile.row,
    });
  }
}

function resolveRemainingFaces(
  configuredFaces: CubeFaceId[] | undefined,
  heroFaces: CubeFaceId[],
): CubeFaceId[] {
  const allFaces = configuredFaces && configuredFaces.length > 0 ? configuredFaces : CUBE_FACE_ORDER;
  const heroSet = new Set(heroFaces);
  return allFaces.filter((face) => !heroSet.has(face));
}

function dedupeAssets(assets: MuseumShellPreloadAsset[]): MuseumShellPreloadAsset[] {
  const seen = new Set<string>();
  const result: MuseumShellPreloadAsset[] = [];
  for (const asset of assets) {
    const key = `${asset.kind}:${asset.role}:${asset.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(asset);
  }
  return result;
}
