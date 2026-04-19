import type { SceneTransitionPlan } from './sceneTransitionMath.ts';

export type SceneTransitionStage = 'turn-in' | 'travel' | 'settle';

export type SceneTransitionFrame = {
  progress: number;
  stageProgress: number;
  targetReady: boolean;
  stage: SceneTransitionStage;
  sourceKind: 'scene' | 'cover';
  displayWorldYaw: number;
  travelDirX: -1 | 1;
  wipeFrom: 'left' | 'right' | 'center';
  revealProgress: number;
  targetMixProgress: number;
  settleStrength: number;
  fromOpacity: number;
  fromEdgeMix: number;
  targetFocus: number;
  wipeSoftness: number;
  distortionStrength: number;
  blurPx: number;
  glassAlpha: number;
  motionBlurStrength: number;
  fovDelta: number;
  zoomScale: number;
  fromShiftPercent: number;
  toShiftPercent: number;
  shearDeg: number;
  curveStrength: number;
  forwardDriveStrength: number;
  occlusionOpacity: number;
};

type BuildSceneTransitionFrameArgs = {
  currentWorldYaw: number;
  targetWorldYaw: number;
  plan: SceneTransitionPlan;
  progress: number;
  targetReady: boolean;
  targetReadyProgress?: number;
  sourceKind?: 'scene' | 'cover';
};

export const TURN_IN_RATIO = 0.44;
export const WIPE_SOFTNESS = 0.08;
export const DISTORTION_STRENGTH = 0.4;
export const BLUR_STRENGTH = 16;
export const FOV_PULSE_IN = -5.8;
export const FOV_PULSE_OUT = 2.8;

const SETTLE_RATIO_MIN = 0.12;
const SETTLE_RATIO_MAX = 0.2;
const DEFAULT_GLASS_ALPHA = 0.22;
const TARGET_NOT_READY_GLASS_ALPHA = 0.3;
const OCCLUSION_ALPHA = 0.38;

export function buildSceneTransitionFrame({
  currentWorldYaw,
  targetWorldYaw,
  plan,
  progress,
  targetReady,
  targetReadyProgress,
  sourceKind = 'scene',
}: BuildSceneTransitionFrameArgs): SceneTransitionFrame {
  const normalizedProgress = clamp(progress, 0, 1);
  const totalMs = plan.durationMs + plan.settleMs;
  const settleRatio = clamp(plan.settleMs / Math.max(totalMs, 1), SETTLE_RATIO_MIN, SETTLE_RATIO_MAX);
  const settleStart = 1 - settleRatio;
  const forwardRevealMode = plan.wipeFrom === 'center';
  const lateralFactor = forwardRevealMode ? 0.18 : 1;
  const turnInEndYaw = normalizeSignedAngle(
    currentWorldYaw + plan.travelDirX * plan.turnLead,
  );
  const targetRevealState = resolveTargetRevealState({
    normalizedProgress,
    settleStart,
    targetReady,
    targetReadyProgress,
    sourceKind,
    forwardRevealMode,
  });

  if (normalizedProgress <= TURN_IN_RATIO) {
    const localT = easeOutCubic(safeRatio(normalizedProgress, TURN_IN_RATIO));
    const displayWorldYaw = interpolateAngle(currentWorldYaw, turnInEndYaw, localT);
    const forwardLift = plan.forwardDriveStrength * (0.22 + localT * 0.28);
    const blurPx = mix(BLUR_STRENGTH * 0.92, BLUR_STRENGTH * 0.68, localT) - forwardLift * 1.3;
    return {
      progress: round4(normalizedProgress),
      stageProgress: round4(localT),
      targetReady,
      stage: 'turn-in',
      sourceKind,
      displayWorldYaw,
      travelDirX: plan.travelDirX,
      wipeFrom: plan.wipeFrom,
      revealProgress: 0,
      targetMixProgress: 0,
      settleStrength: 0,
      fromOpacity: round3(
        sourceKind === 'cover'
          ? mix(0.28, 0.16, localT)
          : forwardRevealMode
            ? mix(0.94, 0.78, localT) - forwardLift * 0.04
            : mix(0.9, 0.7, localT) - forwardLift * 0.1,
      ),
      fromEdgeMix: round3(
        sourceKind === 'cover'
          ? 0.995
          : forwardRevealMode
            ? mix(0.34, 0.7, localT) + forwardLift * 0.08
            : mix(0.26, 0.6, localT) + forwardLift * 0.06,
      ),
      targetFocus: round3(
        sourceKind === 'cover'
          ? mix(0.22, 0.38, localT)
          : forwardRevealMode
            ? mix(0.04, 0.1, localT) + forwardLift * 0.08
            : mix(0.08, 0.18, localT) + forwardLift * 0.14,
      ),
      wipeSoftness: WIPE_SOFTNESS,
      distortionStrength: round3(
        DISTORTION_STRENGTH * (sourceKind === 'cover' ? 0.68 : 0.92) * (1 + forwardLift * 0.4),
      ),
      blurPx: round2(Math.max(7.5, blurPx)),
      glassAlpha: TARGET_NOT_READY_GLASS_ALPHA,
      motionBlurStrength: round3(0.11 + forwardLift * 0.12),
      fovDelta: round2(FOV_PULSE_IN * (0.68 + 0.32 * localT)),
      zoomScale: round4(1 + 0.032 * localT + forwardLift * 0.04),
      fromShiftPercent: round2(plan.travelDirX * (sourceKind === 'cover' ? 3.4 : 3.4 + forwardLift * 2.8) * localT * lateralFactor),
      toShiftPercent: round2(plan.travelDirX * (12.6 + forwardLift * 6.4) * (1 - localT * 0.9) * lateralFactor),
      shearDeg: round2(plan.travelDirX * (2.1 + plan.curveStrength * 4.8) * localT * lateralFactor),
      curveStrength: round3(Math.min(1, plan.curveStrength * 1.08)),
      forwardDriveStrength: round3(plan.forwardDriveStrength),
      occlusionOpacity: round3((0.22 + plan.curveStrength * 0.28 + plan.forwardDriveStrength * 0.18) * localT),
    };
  }

  if (normalizedProgress < settleStart) {
    const travelT = safeRatio(normalizedProgress - TURN_IN_RATIO, settleStart - TURN_IN_RATIO);
    const easedTravel = easeInOutCubic(travelT);
    const displayWorldYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, easedTravel);
    const midBell = bellCurve(travelT);
    const blurBase = targetReady
      ? mix(
          BLUR_STRENGTH * (sourceKind === 'cover' ? 0.62 : 0.48),
          BLUR_STRENGTH * 0.08,
          targetRevealState.revealProgress,
        )
      : BLUR_STRENGTH * (sourceKind === 'cover' ? 0.94 : 0.68);
    const forwardDrive = plan.forwardDriveStrength * (0.32 + midBell * 0.68);
    const blurPx = blurBase + BLUR_STRENGTH * 0.05 * midBell;
    const distortionStrength =
      DISTORTION_STRENGTH * (1.08 + 0.5 * midBell + plan.curveStrength * 0.24 + plan.forwardDriveStrength * 0.3);
    const fromOpacity = targetReady
      ? sourceKind === 'cover'
        ? mix(0.22, 0.02, targetRevealState.targetMixProgress)
        : forwardRevealMode
          ? mix(0.84, 0.28, targetRevealState.targetMixProgress)
          : mix(0.66, 0.12, targetRevealState.targetMixProgress)
      : sourceKind === 'cover'
        ? 0.28
        : forwardRevealMode
          ? mix(0.82, 0.64, easedTravel) - forwardDrive * 0.02
          : mix(0.62, 0.38, easedTravel) - forwardDrive * 0.12;
    const fromEdgeMix = sourceKind === 'cover'
      ? 0.98
      : targetReady
        ? forwardRevealMode
          ? mix(0.68, 0.94, targetRevealState.targetMixProgress)
          : mix(0.52, 0.9, targetRevealState.targetMixProgress)
        : forwardRevealMode
          ? mix(0.62, 0.88, easedTravel) + forwardDrive * 0.08
          : mix(0.52, 0.88, easedTravel) + forwardDrive * 0.12;
    const targetFocus = targetReady
      ? forwardRevealMode
        ? targetRevealState.targetFocus * 0.76
        : targetRevealState.targetFocus
      : sourceKind === 'cover'
        ? 0.16
        : forwardRevealMode
          ? mix(0.08, 0.16, midBell) + forwardDrive * 0.04
          : mix(0.16, 0.36, midBell) + forwardDrive * 0.14;
    return {
      progress: round4(normalizedProgress),
      stageProgress: round4(easedTravel),
      targetReady,
      stage: 'travel',
      sourceKind,
      displayWorldYaw,
      travelDirX: plan.travelDirX,
      wipeFrom: plan.wipeFrom,
      revealProgress: round3(targetRevealState.revealProgress),
      targetMixProgress: round3(targetRevealState.targetMixProgress),
      settleStrength: 0,
      fromOpacity: round3(fromOpacity),
      fromEdgeMix: round3(fromEdgeMix),
      targetFocus: round3(targetFocus),
      wipeSoftness: round3(WIPE_SOFTNESS + plan.curveStrength * 0.03),
      distortionStrength: round3(distortionStrength),
      blurPx: round2(
        Math.max(
          forwardRevealMode ? 6.6 : 5.5,
          blurPx - plan.forwardDriveStrength * (forwardRevealMode ? 2.4 : 4.1),
        ),
      ),
      glassAlpha: round3(targetReady ? DEFAULT_GLASS_ALPHA : TARGET_NOT_READY_GLASS_ALPHA),
      motionBlurStrength: round3(
        0.2 + midBell * 0.38 + plan.forwardDriveStrength * (forwardRevealMode ? 0.16 : 0.12),
      ),
      fovDelta: round2(resolveTravelFovDelta(normalizedProgress, settleStart)),
      zoomScale: round4(
        1 +
          0.05 +
          midBell * 0.072 +
          plan.forwardDriveStrength * (forwardRevealMode ? 0.052 + midBell * 0.07 : 0.036 + midBell * 0.054),
      ),
      fromShiftPercent: round2(plan.travelDirX * mix(sourceKind === 'cover' ? 3.8 : 3.2, sourceKind === 'cover' ? 9.4 : 8.4, easedTravel) * lateralFactor),
      toShiftPercent: round2(plan.travelDirX * mix(14.8 + plan.forwardDriveStrength * 6, 0.3, targetRevealState.revealProgress) * lateralFactor),
      shearDeg: round2(plan.travelDirX * (3.4 + plan.curveStrength * 7.6 + plan.forwardDriveStrength * 2.8) * midBell * lateralFactor),
      curveStrength: round3(Math.min(1, plan.curveStrength * 1.1)),
      forwardDriveStrength: round3(plan.forwardDriveStrength),
      occlusionOpacity: round3((0.28 + plan.curveStrength * (OCCLUSION_ALPHA + 0.12) + plan.forwardDriveStrength * 0.24) * midBell),
    };
  }

  const settleT = easeOutQuad(safeRatio(normalizedProgress - settleStart, 1 - settleStart));
  const settleStartYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, 1);
  const blurPx = targetReady ? mix(BLUR_STRENGTH * 0.22, 0, settleT) : BLUR_STRENGTH * 0.88;
  const revealProgress = targetReady
    ? round3(mix(targetRevealState.revealProgress, 1, settleT))
    : 0;
  const targetMixProgress = targetReady
    ? round3(mix(targetRevealState.targetMixProgress, 1, settleT))
    : 0;
  const targetFocus = targetReady
    ? round3(mix(targetRevealState.targetFocus, 1, settleT))
    : 0.34;
  return {
    progress: round4(normalizedProgress),
    stageProgress: round4(settleT),
    targetReady,
    stage: 'settle',
    sourceKind,
    displayWorldYaw: interpolateAngle(settleStartYaw, targetWorldYaw, settleT),
    travelDirX: plan.travelDirX,
    wipeFrom: plan.wipeFrom,
    revealProgress,
    targetMixProgress,
    settleStrength: round3(targetReady ? settleT : 0),
    fromOpacity: round3(
      targetReady
        ? mix(
            sourceKind === 'cover'
              ? mix(0.1, 0.02, targetRevealState.targetMixProgress)
              : mix(0.22, 0.06, targetRevealState.targetMixProgress),
            0,
            settleT,
          )
        : (sourceKind === 'cover' ? 0.32 : 0.18),
    ),
    fromEdgeMix: round3(sourceKind === 'cover' ? 1 : (targetReady ? mix(0.9, 0.98, settleT) : 0.98)),
    targetFocus,
    wipeSoftness: round3(WIPE_SOFTNESS + plan.curveStrength * 0.02),
    distortionStrength: round3(DISTORTION_STRENGTH * (1 - settleT * 0.8)),
    blurPx: round2(blurPx),
    glassAlpha: round3(targetReady ? mix(DEFAULT_GLASS_ALPHA, 0.08, settleT) : TARGET_NOT_READY_GLASS_ALPHA),
    motionBlurStrength: round3(targetReady ? mix(0.12, 0, settleT) : 0.07),
    fovDelta: round2(mix(0.55, 0, settleT)),
    zoomScale: round4(mix(1.02, 1, settleT)),
    fromShiftPercent: round2(plan.travelDirX * mix(sourceKind === 'cover' ? 3.6 : 3, 0, settleT) * lateralFactor),
    toShiftPercent: round2(plan.travelDirX * mix(1.4, 0, settleT) * lateralFactor),
    shearDeg: round2(plan.travelDirX * mix(1.9 + plan.curveStrength * 2.5, 0, settleT) * lateralFactor),
    curveStrength: round3(Math.min(1, plan.curveStrength * 1.08)),
    forwardDriveStrength: round3(plan.forwardDriveStrength),
    occlusionOpacity: round3(mix(0.16 + plan.curveStrength * 0.2 + plan.forwardDriveStrength * 0.08, 0, settleT)),
  };
}

function resolveTravelFovDelta(progress: number, settleStart: number): number {
  if (progress <= 0.26) {
    return mix(0, FOV_PULSE_IN, easeOutCubic(safeRatio(progress, 0.26)));
  }
  if (progress <= 0.54) {
    return mix(
      FOV_PULSE_IN,
      FOV_PULSE_OUT,
      easeInOutCubic(safeRatio(progress - 0.26, 0.28)),
    );
  }
  if (progress <= settleStart) {
    return mix(
      FOV_PULSE_OUT,
      0.6,
      easeOutCubic(safeRatio(progress - 0.54, Math.max(settleStart - 0.54, 0.001))),
    );
  }
  return 0.6;
}

function resolveTargetRevealState({
  normalizedProgress,
  settleStart,
  targetReady,
  targetReadyProgress,
  sourceKind,
  forwardRevealMode,
}: {
  normalizedProgress: number;
  settleStart: number;
  targetReady: boolean;
  targetReadyProgress?: number;
  sourceKind: 'scene' | 'cover';
  forwardRevealMode: boolean;
}): {
  revealProgress: number;
  targetMixProgress: number;
  targetFocus: number;
} {
  if (!targetReady) {
    return {
      revealProgress: 0,
      targetMixProgress: 0,
      targetFocus: 0,
    };
  }

  const readyProgress = clamp(
    Math.max(
      targetReadyProgress ?? TURN_IN_RATIO,
      sourceKind === 'scene'
        ? TURN_IN_RATIO + (forwardRevealMode ? 0.18 : 0.1)
        : TURN_IN_RATIO + 0.05,
    ),
    0,
    Math.min(normalizedProgress, settleStart),
  );
  const readyWindow = Math.max((1 - readyProgress) * (forwardRevealMode ? 0.82 : 0.68), 0.001);
  const readyDelta = Math.max(normalizedProgress - readyProgress, 0);
  const revealRatio = safeRatio(readyDelta, readyWindow);
  const constrainedRevealRatio = forwardRevealMode ? Math.pow(revealRatio, 1.28) : revealRatio;
  const revealProgress = easeInOutCubic(constrainedRevealRatio);
  const mixLead = easeOutQuad(safeRatio(readyDelta, readyWindow * (forwardRevealMode ? 1.04 : 0.88)));
  const targetMixProgress = clamp(
    (sourceKind === 'cover' ? 0.03 : 0.0) +
      revealProgress * (sourceKind === 'cover' ? 0.82 : forwardRevealMode ? 0.54 : 0.72) +
      mixLead * (sourceKind === 'cover' ? 0.12 : forwardRevealMode ? 0.07 : 0.1),
    0,
    forwardRevealMode ? 0.72 : 0.94,
  );
  const targetFocus = clamp(
    (sourceKind === 'cover' ? 0.2 : forwardRevealMode ? 0.02 : 0.04) +
      revealProgress * (sourceKind === 'cover' ? 0.66 : forwardRevealMode ? 0.42 : 0.56) +
      mixLead * (sourceKind === 'cover' ? 0.12 : forwardRevealMode ? 0.06 : 0.1),
    0,
    1,
  );

  return {
    revealProgress,
    targetMixProgress,
    targetFocus,
  };
}

function interpolateAngle(from: number, to: number, t: number): number {
  const delta = normalizeSignedAngle(to - from);
  return round2(normalizeSignedAngle(from + delta * clamp(t, 0, 1)));
}

function normalizeSignedAngle(angle: number): number {
  const normalized = ((angle + 180) % 360 + 360) % 360 - 180;
  return Object.is(normalized, -0) ? 0 : normalized;
}

function safeRatio(value: number, total: number): number {
  if (total <= 0) return 1;
  return clamp(value / total, 0, 1);
}

function bellCurve(t: number): number {
  const clamped = clamp(t, 0, 1);
  return 1 - Math.pow(clamped * 2 - 1, 2);
}

function easeOutCubic(t: number): number {
  const inv = 1 - clamp(t, 0, 1);
  return 1 - inv * inv * inv;
}

function easeInOutCubic(t: number): number {
  const clamped = clamp(t, 0, 1);
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

function easeOutQuad(t: number): number {
  const clamped = clamp(t, 0, 1);
  return 1 - (1 - clamped) * (1 - clamped);
}

function mix(from: number, to: number, t: number): number {
  return from + (to - from) * clamp(t, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round2(value: number): number {
  return Number(value.toFixed(2));
}

function round3(value: number): number {
  return Number(value.toFixed(3));
}

function round4(value: number): number {
  return Number(value.toFixed(4));
}
