import { resolveAssetUrl, AssetType } from '../utils/assetResolver.ts';
import { normalizeTileManifest, type TileImageFormat, type TileMeshFormat } from './tileFormatPolicy.ts';
import { appendFreshParamToTileManifestUrl, createTileManifestRequestInit } from './tileManifestFetchPolicy.ts';

export type TileLevel = {
  z: number;
  cols: number;
  rows: number;
};

export type CubeFaceId = 'f' | 'r' | 'b' | 'l' | 'u' | 'd';

export type EquirectTileManifest = {
  type: 'equirect-tiles';
  tileSize: number;
  baseUrl: string;
  levels: TileLevel[];
  tileFormat?: TileImageFormat;
  lowFallbackFormat?: 'jpg';
  highFallbackFormats?: TileMeshFormat[];
  lowLevelZ?: number;
  highWarmupTileBudget?: number;
};

export type CubemapTileManifest = {
  type: 'cubemap-tiles';
  baseUrl: string;
  lowFaceSize: number;
  highTileSize: number;
  highGrid: number;
  faces?: CubeFaceId[];
  assetFaceByWorldFace?: Partial<Record<CubeFaceId, CubeFaceId>>;
  tileFormat?: TileImageFormat;
  lowFallbackFormat?: 'jpg';
  highFallbackFormats?: TileMeshFormat[];
  highWarmupTileBudget?: number;
};

export type TileManifest = EquirectTileManifest | CubemapTileManifest;

const tileManifestPromiseCache = new Map<string, Promise<TileManifest>>();

function absolutizeManifestBaseUrl(baseUrl: string, manifestUrl: string): string {
  const trimmed = baseUrl.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('//')) return trimmed;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) return trimmed;

  try {
    const resolved = new URL(trimmed, manifestUrl);
    const currentOrigin =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : (typeof location !== 'undefined' ? location.origin : '');
    if (currentOrigin && resolved.origin === currentOrigin) {
      return `${resolved.pathname}${resolved.search}${resolved.hash}`;
    }
    return resolved.toString();
  } catch {
    return trimmed;
  }
}

export async function fetchTileManifest(url: string): Promise<TileManifest> {
  const requestUrl = appendFreshParamToTileManifestUrl(url);
  const cached = tileManifestPromiseCache.get(requestUrl);
  if (cached) {
    return cached;
  }

  const promise = fetch(requestUrl, createTileManifestRequestInit())
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`manifest 加载失败: ${requestUrl}`);
      }
      const manifest = normalizeTileManifest((await res.json()) as TileManifest);
      manifest.baseUrl = resolveAssetUrl(
        absolutizeManifestBaseUrl(manifest.baseUrl, requestUrl),
        AssetType.PANO
      );
      return manifest;
    })
    .catch((error) => {
      tileManifestPromiseCache.delete(requestUrl);
      throw error;
    });

  tileManifestPromiseCache.set(requestUrl, promise);
  return promise;
}

export function clearTileManifestCache(): void {
  tileManifestPromiseCache.clear();
}
