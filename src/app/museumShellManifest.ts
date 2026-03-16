import type { AppConfig, Museum, Scene, SceneHotspot } from '../types/config.ts';
import { getMuseumEntrySceneId } from '../utils/museumEntry.ts';

export type MuseumShellCover = {
  heroImage: string;
  brandTitle: string;
  brandLogos: string[];
  ctaLabel: string;
  eyebrow: string;
  note: string;
  title: string;
  subtitle: string;
};

export type MuseumShellScenePreview = {
  url: string;
  width?: number;
  height?: number;
};

export type MuseumShellSceneHires =
  | {
      format: 'tile-manifest';
      manifestUrl: string;
    }
  | {
      format: 'panorama';
      url: string;
    };

export type MuseumShellScene = {
  id: string;
  title: string;
  preview: MuseumShellScenePreview;
  hires?: MuseumShellSceneHires;
  defaultView: {
    yaw: number;
    pitch: number;
    fov: number;
  };
  hotspots: SceneHotspot[];
  neighbors: string[];
};

export type MuseumShellManifest = {
  id: string;
  title: string;
  subtitle: string;
  defaultSceneId: string;
  cover: MuseumShellCover;
  scenes: MuseumShellScene[];
};

type MuseumShellConfigOverride = {
  title?: string;
  subtitle?: string;
  defaultSceneId?: string;
  cover?: Partial<Omit<MuseumShellCover, 'brandTitle'>>;
};

type SceneShellConfigOverride = {
  preview?: Partial<MuseumShellScenePreview>;
  hires?: MuseumShellSceneHires;
  neighbors?: string[];
};

export function createMuseumShellManifest(config: AppConfig, museum: Museum): MuseumShellManifest {
  const shellOverride = (museum as Museum & { shell?: MuseumShellConfigOverride }).shell;
  const defaultSceneId = shellOverride?.defaultSceneId || getMuseumEntrySceneId(museum);
  if (!defaultSceneId) {
    throw new Error(`museum ${museum.id} does not contain any scenes`);
  }

  const title = shellOverride?.title?.trim() || museum.name;
  const subtitle =
    shellOverride?.subtitle?.trim() ||
    museum.marketing?.hook?.trim() ||
    museum.description?.trim() ||
    '';

  const cover: MuseumShellCover = {
    heroImage: shellOverride?.cover?.heroImage?.trim() || museum.cover,
    brandTitle: config.landing?.brandTitle?.trim() || config.appName,
    brandLogos: normalizeStringArray(shellOverride?.cover?.brandLogos),
    ctaLabel: shellOverride?.cover?.ctaLabel?.trim() || '点击开启 VR 漫游',
    eyebrow: shellOverride?.cover?.eyebrow?.trim() || 'Museum Immersion',
    note: shellOverride?.cover?.note?.trim() || '进入同一馆壳层内的连续漫游',
    title: shellOverride?.cover?.title?.trim() || title,
    subtitle: shellOverride?.cover?.subtitle?.trim() || subtitle,
  };

  return {
    id: museum.id,
    title,
    subtitle,
    defaultSceneId,
    cover,
    scenes: museum.scenes.map((scene) => createMuseumShellScene(scene)),
  };
}

export function getMuseumShellScene(
  museum: MuseumShellManifest,
  sceneId: string,
): MuseumShellScene | null {
  return museum.scenes.find((scene) => scene.id === sceneId) ?? null;
}

function createMuseumShellScene(scene: Scene): MuseumShellScene {
  const shellOverride = (scene as Scene & { shell?: SceneShellConfigOverride }).shell;
  const previewUrl =
    shellOverride?.preview?.url?.trim() || scene.panoLow || scene.thumb || scene.pano || '';
  if (!previewUrl) {
    throw new Error(`scene ${scene.id} is missing preview assets`);
  }

  const preview: MuseumShellScenePreview = {
    url: previewUrl,
    ...optionalSize('width', shellOverride?.preview?.width),
    ...optionalSize('height', shellOverride?.preview?.height),
  };

  const hires =
    shellOverride?.hires ||
    (scene.panoTiles?.manifest
      ? { format: 'tile-manifest', manifestUrl: scene.panoTiles.manifest }
      : scene.pano || scene.panoLow
        ? { format: 'panorama', url: scene.pano || scene.panoLow || previewUrl }
        : undefined);

  return {
    id: scene.id,
    title: scene.name,
    preview,
    hires,
    defaultView: {
      yaw: scene.initialView.yaw,
      pitch: scene.initialView.pitch,
      fov: scene.initialView.fov ?? 75,
    },
    hotspots: scene.hotspots,
    neighbors: collectNeighbors(scene, shellOverride?.neighbors),
  };
}

function collectNeighbors(scene: Scene, explicitNeighbors?: string[]): string[] {
  if (explicitNeighbors && explicitNeighbors.length > 0) {
    return Array.from(
      new Set(
        explicitNeighbors.filter(
          (value): value is string => typeof value === 'string' && value.trim().length > 0,
        ),
      ),
    );
  }

  const sceneIds = scene.hotspots
    .filter((hotspot) => hotspot.type === 'scene' && hotspot.target?.sceneId)
    .map((hotspot) => hotspot.target?.sceneId)
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  return Array.from(new Set(sceneIds));
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function toFinitePositiveNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;
}

function optionalSize(
  key: 'width' | 'height',
  value: unknown,
): Partial<Pick<MuseumShellScenePreview, 'width' | 'height'>> {
  const normalized = toFinitePositiveNumber(value);
  return normalized ? { [key]: normalized } : {};
}
