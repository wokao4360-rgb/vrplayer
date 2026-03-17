type SceneLike = {
  panoTiles?: {
    manifest?: string;
    worldYawOffset?: number;
  };
};

export type CubePolicyView = {
  yawDeg: number;
  pitchDeg: number;
};

export function getSceneWorldYawOffset(scene: SceneLike | null | undefined): number {
  const offset = scene?.panoTiles?.worldYawOffset;
  if (typeof offset === 'number' && Number.isFinite(offset)) {
    return offset;
  }
  if (scene?.panoTiles?.manifest) {
    return 180;
  }
  return 0;
}

export function worldYawToInternalYaw(
  scene: SceneLike | null | undefined,
  worldYaw: number,
): number {
  const internalYaw = -(worldYaw + getSceneWorldYawOffset(scene));
  return Object.is(internalYaw, -0) ? 0 : internalYaw;
}

function normalizeSignedAngle(angle: number): number {
  const normalized = ((angle + 180) % 360 + 360) % 360 - 180;
  return Object.is(normalized, -0) ? 0 : normalized;
}

export function internalYawToWorldYaw(
  scene: SceneLike | null | undefined,
  internalYaw: number,
): number {
  return normalizeSignedAngle(-internalYaw - getSceneWorldYawOffset(scene));
}

export function normalizeCubemapPolicyView(
  scene: SceneLike | null | undefined,
  view: CubePolicyView,
): CubePolicyView {
  return {
    yawDeg: internalYawToWorldYaw(scene, view.yawDeg),
    pitchDeg: view.pitchDeg,
  };
}
