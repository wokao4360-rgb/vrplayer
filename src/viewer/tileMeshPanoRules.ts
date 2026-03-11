export type TileMeshPriority = 'low' | 'high';

type TileUvBounds = {
  minU: number;
  maxU: number;
  minV: number;
  maxV: number;
};

type TileUv = {
  u: number;
  v: number;
};

type TileMeshRenderConfig = {
  depthTest: boolean;
  depthWrite: boolean;
  renderOrder: number;
};

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function normalizeTileUv(rawU: number, rawV: number, bounds: TileUvBounds): TileUv {
  const du = bounds.maxU - bounds.minU || 1;
  const dv = bounds.maxV - bounds.minV || 1;

  return {
    u: clamp01((rawU - bounds.minU) / du),
    v: clamp01(1 - (rawV - bounds.minV) / dv),
  };
}

export function getTileMeshRenderConfig(priority: TileMeshPriority): TileMeshRenderConfig {
  return {
    depthTest: true,
    depthWrite: true,
    renderOrder: priority === 'high' ? 3 : 2,
  };
}

export function resolveKtx2TranscoderPath(baseHref?: string | null): string {
  const candidates = [
    baseHref,
    typeof document !== 'undefined' ? document.baseURI : null,
    typeof window !== 'undefined' ? window.location?.href : null,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return new URL('assets/basis/', new URL('./', candidate)).toString();
    } catch {
      // try next candidate
    }
  }

  return '/assets/basis/';
}
