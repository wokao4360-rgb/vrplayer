import { resolveAssetUrl, AssetType } from '../utils/assetResolver.ts';
import { fetchTileManifest, type CubemapTileManifest, type TileManifest } from '../viewer/tileManifest.ts';
import { buildCubeHighTileUrl, buildCubeLowFaceUrl, getCubeAssetFace } from '../viewer/tileFormatPolicy.ts';
import {
  buildMuseumShellPreloadPlan,
  type MuseumShellPreloadAsset,
  type MuseumShellPreloadPlan,
} from './museumShellPreloadPlanner.ts';
import { getMuseumShellScene, type MuseumShellManifest } from './museumShellManifest.ts';
import {
  resolveMuseumShellWarmExecutionLayers,
  type MuseumShellWarmPhase,
} from './museumShellPreloadExecution.ts';

export type MuseumShellWarmResult = {
  previewUrl: string | null;
  previewReady: boolean;
  hiresManifest: TileManifest | null;
  plan: MuseumShellPreloadPlan;
};

type WarmArgs = {
  museum: MuseumShellManifest;
  sceneId: string;
  phase: MuseumShellWarmPhase;
  view: {
    yaw: number;
    pitch: number;
    fov: number;
  };
};

export class MuseumShellPreloader {
  private readonly loadedUrls = new Set<string>();
  private readonly imagePromises = new Map<string, Promise<void>>();
  private readonly previewReadyBySceneId = new Map<string, string>();
  private readonly manifestPromises = new Map<string, Promise<TileManifest>>();
  private readonly hiresManifestBySceneId = new Map<string, TileManifest>();
  private readonly backgroundTimers = new Set<number>();

  async warm(args: WarmArgs): Promise<MuseumShellWarmResult> {
    const scene = getMuseumShellScene(args.museum, args.sceneId);
    if (!scene) {
      throw new Error(`scene ${args.sceneId} not found in museum ${args.museum.id}`);
    }

    const hiresManifest = await this.ensureHiresManifest(scene.id, scene.hires);
    const plan = buildMuseumShellPreloadPlan({
      museum: args.museum,
      sceneId: args.sceneId,
      phase: args.phase,
      view: args.view,
      hiresManifestBySceneId: hiresManifest ? { [scene.id]: hiresManifest } : {},
    });

    this.cancelBackgroundWork();
    for (const layer of resolveMuseumShellWarmExecutionLayers(args.phase)) {
      await this.preloadLayer(plan[layer], hiresManifest);
    }

    return {
      previewUrl: this.previewReadyBySceneId.get(scene.id) ?? scene.preview.url ?? null,
      previewReady: this.previewReadyBySceneId.has(scene.id),
      hiresManifest,
      plan,
    };
  }

  async warmNeighborPreviews(museum: MuseumShellManifest, sceneId: string): Promise<void> {
    const scene = getMuseumShellScene(museum, sceneId);
    if (!scene) return;
    const previewAssets = scene.neighbors
      .map((neighborId) => getMuseumShellScene(museum, neighborId))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((neighbor) => ({
        kind: 'image' as const,
        role: 'neighbor-preview' as const,
        url: neighbor.preview.url,
        sceneId: neighbor.id,
      }));
    await this.preloadLayer(previewAssets, null);
  }

  isPreviewReady(sceneId: string): boolean {
    return this.previewReadyBySceneId.has(sceneId);
  }

  getPreviewUrl(sceneId: string): string | null {
    return this.previewReadyBySceneId.get(sceneId) ?? null;
  }

  getHiresManifest(sceneId: string): TileManifest | null {
    return this.hiresManifestBySceneId.get(sceneId) ?? null;
  }

  dispose(): void {
    this.cancelBackgroundWork();
  }

  private cancelBackgroundWork(): void {
    for (const timer of this.backgroundTimers) {
      window.clearTimeout(timer);
    }
    this.backgroundTimers.clear();
  }

  private async ensureHiresManifest(
    sceneId: string,
    hires: { format: 'tile-manifest'; manifestUrl: string } | { format: 'panorama'; url: string } | undefined,
  ): Promise<TileManifest | null> {
    if (!hires || hires.format !== 'tile-manifest') {
      return null;
    }
    if (this.hiresManifestBySceneId.has(sceneId)) {
      return this.hiresManifestBySceneId.get(sceneId) ?? null;
    }
    const cacheKey = `${sceneId}:${hires.manifestUrl}`;
    let promise = this.manifestPromises.get(cacheKey);
    if (!promise) {
      const manifestUrl = resolveAssetUrl(hires.manifestUrl, AssetType.PANO) || hires.manifestUrl;
      promise = fetchTileManifest(manifestUrl).then((manifest) => {
        this.hiresManifestBySceneId.set(sceneId, manifest);
        return manifest;
      });
      this.manifestPromises.set(cacheKey, promise);
    }
    return promise;
  }

  private async preloadLayer(
    assets: MuseumShellPreloadAsset[],
    hiresManifest: TileManifest | null,
  ): Promise<void> {
    await Promise.allSettled(assets.map((asset) => this.preloadAsset(asset, hiresManifest)));
  }

  private async preloadAsset(
    asset: MuseumShellPreloadAsset,
    hiresManifest: TileManifest | null,
  ): Promise<void> {
    if (asset.kind === 'json') {
      return;
    }

    const resolvedUrl = this.resolveAssetFetchUrl(asset, hiresManifest);
    if (!resolvedUrl) return;
    await this.ensureImage(resolvedUrl);
    if (asset.role === 'scene-preview' && asset.sceneId) {
      this.previewReadyBySceneId.set(asset.sceneId, resolvedUrl);
    }
  }

  private resolveAssetFetchUrl(
    asset: MuseumShellPreloadAsset,
    hiresManifest: TileManifest | null,
  ): string {
    if (asset.role === 'museum-cover') {
      return resolveAssetUrl(asset.url, AssetType.COVER) || asset.url;
    }
    if (asset.role === 'scene-preview' || asset.role === 'neighbor-preview' || asset.role === 'hero-panorama') {
      return resolveAssetUrl(asset.url, AssetType.PANO) || asset.url;
    }

    if (
      hiresManifest &&
      hiresManifest.type === 'cubemap-tiles' &&
      asset.worldFace &&
      (asset.role === 'low-face' || asset.role === 'hero-high-tile' || asset.role === 'remaining-high-tile')
    ) {
      return this.resolveCubemapAssetUrl(asset, hiresManifest);
    }

    return resolveAssetUrl(asset.url, AssetType.PANO) || asset.url;
  }

  private resolveCubemapAssetUrl(
    asset: MuseumShellPreloadAsset,
    manifest: CubemapTileManifest,
  ): string {
    const assetFace = getCubeAssetFace(manifest, asset.worldFace!);
    const tileFormat = manifest.tileFormat ?? 'avif';
    if (asset.role === 'low-face') {
      return buildCubeLowFaceUrl(manifest.baseUrl, assetFace, tileFormat);
    }
    return buildCubeHighTileUrl(
      manifest.baseUrl,
      assetFace,
      asset.col ?? 0,
      asset.row ?? 0,
      tileFormat,
    );
  }

  private ensureImage(url: string): Promise<void> {
    if (this.loadedUrls.has(url)) {
      return Promise.resolve();
    }

    const existing = this.imagePromises.get(url);
    if (existing) {
      return existing;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.onload = () => {
        this.loadedUrls.add(url);
        this.imagePromises.delete(url);
        resolve();
      };
      img.onerror = () => {
        this.imagePromises.delete(url);
        reject(new Error(`image preload failed: ${url}`));
      };
      img.src = url;
      if (typeof img.decode === 'function') {
        img.decode().then(
          () => {
            this.loadedUrls.add(url);
            this.imagePromises.delete(url);
            resolve();
          },
          () => {
            // decode 失败时仍让 onload 接管
          },
        );
      }
    });

    this.imagePromises.set(url, promise);
    return promise;
  }
}
