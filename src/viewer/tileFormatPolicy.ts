import type { TileManifest, CubeFaceId } from './tileManifest';

export type TileImageFormat = 'avif' | 'jpg' | 'ktx2';
export type TileBitmapFormat = 'avif' | 'jpg';
export type TileMeshFormat = 'ktx2' | 'jpg';
export type TileBackendKind = 'canvas' | 'mesh';

export type NormalizedTileManifest = Omit<
  TileManifest,
  'tileFormat' | 'lowFallbackFormat' | 'highFallbackFormats'
> & {
  tileFormat: TileImageFormat;
  lowFallbackFormat?: 'jpg';
  highFallbackFormats?: TileMeshFormat[];
};

export type TileLoadPlan = {
  bitmapFormats: TileBitmapFormat[];
  meshFormats: TileMeshFormat[];
};

export const DEFAULT_CUBEMAP_FACES: CubeFaceId[] = ['f', 'r', 'b', 'l', 'u', 'd'];

function dedupeFormats<T extends string>(formats: readonly T[]): T[] {
  return Array.from(new Set(formats));
}

export function normalizeTileManifest(manifest: TileManifest): NormalizedTileManifest {
  const tileFormat = manifest.tileFormat ?? 'jpg';
  if (manifest.type === 'cubemap-tiles') {
    const base = {
      ...manifest,
      faces: manifest.faces?.length ? dedupeFormats(manifest.faces) : DEFAULT_CUBEMAP_FACES,
    } as NormalizedTileManifest;
    if (tileFormat !== 'avif') {
      return {
        ...base,
        tileFormat,
      };
    }

    const lowFallbackFormat = manifest.lowFallbackFormat ?? 'jpg';
    const highFallbackFormats = dedupeFormats(manifest.highFallbackFormats ?? ['ktx2', 'jpg']);
    return {
      ...base,
      tileFormat: 'avif',
      lowFallbackFormat,
      highFallbackFormats,
    };
  }

  if (tileFormat !== 'avif') {
    return {
      ...manifest,
      tileFormat,
    };
  }

  const lowFallbackFormat = manifest.lowFallbackFormat ?? 'jpg';
  const highFallbackFormats = dedupeFormats(manifest.highFallbackFormats ?? ['ktx2', 'jpg']);

  return {
    ...manifest,
    tileFormat: 'avif',
    lowFallbackFormat,
    highFallbackFormats,
  };
}

export function selectInitialTileBackend(
  manifest: TileManifest | NormalizedTileManifest,
): TileBackendKind {
  return normalizeTileManifest(manifest as TileManifest).tileFormat === 'ktx2' ? 'mesh' : 'canvas';
}

export function resolveInitialTileFallbackVisibility(
  manifest: TileManifest | NormalizedTileManifest,
  fallbackPlanned: boolean,
): boolean {
  if (!fallbackPlanned) {
    return false;
  }

  const normalized = normalizeTileManifest(manifest as TileManifest);
  if (normalized.tileFormat === 'avif') {
    // AVIF 主链路即便存在整图 fallback，也必须继续加载 z0/low AVIF。
    return false;
  }

  return true;
}

export function getLowTilePlan(
  manifest: TileManifest | NormalizedTileManifest,
  options?: { avifSupported?: boolean },
): TileLoadPlan {
  const normalized = normalizeTileManifest(manifest as TileManifest);
  const avifSupported = options?.avifSupported ?? true;

  switch (normalized.tileFormat) {
    case 'avif':
      return {
        bitmapFormats: avifSupported ? ['avif', normalized.lowFallbackFormat ?? 'jpg'] : ['jpg'],
        meshFormats: [],
      };
    case 'ktx2':
      return {
        bitmapFormats: [],
        meshFormats: ['ktx2', 'jpg'],
      };
    case 'jpg':
    default:
      return {
        bitmapFormats: ['jpg'],
        meshFormats: [],
      };
  }
}

export function getHighTilePlan(
  manifest: TileManifest | NormalizedTileManifest,
  options?: { avifSupported?: boolean },
): TileLoadPlan {
  const normalized = normalizeTileManifest(manifest as TileManifest);
  const avifSupported = options?.avifSupported ?? true;

  switch (normalized.tileFormat) {
    case 'avif': {
      const fallbackFormats = dedupeFormats(normalized.highFallbackFormats ?? ['ktx2', 'jpg']);
      const hasKtx2Fallback = fallbackFormats.includes('ktx2');
      const bitmapFallbacks = hasKtx2Fallback
        ? []
        : fallbackFormats.filter((format): format is TileBitmapFormat => format === 'jpg');

      return {
        bitmapFormats: avifSupported ? ['avif', ...bitmapFallbacks] : bitmapFallbacks,
        meshFormats: hasKtx2Fallback ? fallbackFormats : [],
      };
    }
    case 'ktx2':
      return {
        bitmapFormats: [],
        meshFormats: ['ktx2', 'jpg'],
      };
    case 'jpg':
    default:
      return {
        bitmapFormats: ['jpg'],
        meshFormats: [],
      };
  }
}

export function buildTileUrl(
  baseUrl: string,
  z: number,
  col: number,
  row: number,
  format: TileImageFormat,
): string {
  return `${baseUrl}/z${z}/${col}_${row}.${format}`;
}

export function buildCubeLowFaceUrl(
  baseUrl: string,
  face: CubeFaceId,
  format: TileBitmapFormat,
): string {
  return `${baseUrl}/low/${face}.${format}`;
}

export function buildCubeHighTileUrl(
  baseUrl: string,
  face: CubeFaceId,
  col: number,
  row: number,
  format: TileImageFormat,
): string {
  return `${baseUrl}/high/${face}/${col}_${row}.${format}`;
}
