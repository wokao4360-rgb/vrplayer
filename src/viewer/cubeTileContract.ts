import type { CubemapTileManifest } from './tileManifest.ts';

export type CubemapBudget = {
  lowFaceCount: number;
  lowFaceSize: number;
  highTileCount: number;
  highTileSize: number;
};

export function getCubemapBudget(manifest: CubemapTileManifest): CubemapBudget {
  const faceCount = manifest.faces?.length ?? 6;
  return {
    lowFaceCount: faceCount,
    lowFaceSize: manifest.lowFaceSize,
    highTileCount: faceCount * manifest.highGrid * manifest.highGrid,
    highTileSize: manifest.highTileSize,
  };
}

export function assertCubemapBitmapDimensions(
  manifest: CubemapTileManifest,
  kind: 'low' | 'high',
  width: number,
  height: number,
  sourceLabel: string,
): void {
  const expected = kind === 'low' ? manifest.lowFaceSize : manifest.highTileSize;
  if (width === expected && height === expected) {
    return;
  }
  throw new Error(
    `cubemap ${kind} tile dimension mismatch for ${sourceLabel}: expected ${expected}x${expected}, got ${width}x${height}`,
  );
}
