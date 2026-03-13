import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { normalizeTileManifest, type TileImageFormat, type TileMeshFormat } from './tileFormatPolicy';

export type TileLevel = {
  z: number;
  cols: number;
  rows: number;
};

export type TileManifest = {
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
  const init: RequestInit = {
    cache: 'default',
  };
  (init as any).priority = 'high';
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`manifest 加载失败: ${url}`);
  }
  const manifest = normalizeTileManifest((await res.json()) as TileManifest);
  manifest.baseUrl = resolveAssetUrl(
    absolutizeManifestBaseUrl(manifest.baseUrl, url),
    AssetType.PANO
  );
  return manifest;
}
