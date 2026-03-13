import type { TileLevel, TileManifest } from './tileManifest';

export const TILE_BITMAP_IMAGE_ORIENTATION = 'flipY' as const;

export function resolveLowTileLevel(manifest: TileManifest, highestLevel: TileLevel): TileLevel | null {
  const levelsBelowHighest = manifest.levels.filter((level) => level.z < highestLevel.z);
  if (levelsBelowHighest.length === 0) {
    return null;
  }

  if (typeof manifest.lowLevelZ === 'number') {
    return (
      levelsBelowHighest.find((level) => level.z === manifest.lowLevelZ) ??
      levelsBelowHighest.reduce((a, b) => (b.z > a.z ? b : a))
    );
  }

  return levelsBelowHighest.reduce((a, b) => (b.z > a.z ? b : a));
}

export function shouldBootstrapSingleTile(level: TileLevel | null): boolean {
  return Boolean(level && level.cols === 1 && level.rows === 1);
}

export function resolveHighWarmupTileBudget(
  manifest: TileManifest,
  highestLevel: TileLevel,
): number | null {
  if (typeof manifest.highWarmupTileBudget === 'number' && manifest.highWarmupTileBudget > 0) {
    return manifest.highWarmupTileBudget;
  }

  return null;
}

export function resolveFrontHemisphereTileBudget(level: TileLevel): number {
  return Math.ceil(level.cols / 2) * level.rows;
}
