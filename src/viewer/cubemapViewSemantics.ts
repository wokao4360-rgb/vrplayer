type SceneLike = {
  panoTiles?: {
    manifest?: string;
    worldYawOffset?: number;
  };
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
