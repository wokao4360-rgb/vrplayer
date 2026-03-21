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
  wipeFrom: 'left' | 'right';
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

export const TURN_IN_RATIO = 0.22;
export const WIPE_SOFTNESS = 0.1;
export const DISTORTION_STRENGTH = 0.13;
export const BLUR_STRENGTH = 16;
export const FOV_PULSE_IN = -2.6;
export const FOV_PULSE_OUT = 0.9;

const SETTLE_RATIO_MIN = 0.12;
const SETTLE_RATIO_MAX = 0.2;
const DEFAULT_GLASS_ALPHA = 0.14;
const TARGET_NOT_READY_GLASS_ALPHA = 0.18;
const OCCLUSION_ALPHA = 0.22;

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
  const turnInEndYaw = normalizeSignedAngle(
    currentWorldYaw + plan.travelDirX * plan.turnLead,
  );
  const targetRevealState = resolveTargetRevealState({
    normalizedProgress,
    settleStart,
    targetReady,
    targetReadyProgress,
    sourceKind,
  });

  if (normalizedProgress <= TURN_IN_RATIO) {
    const localT = easeOutCubic(safeRatio(normalizedProgress, TURN_IN_RATIO));
    const displayWorldYaw = interpolateAngle(currentWorldYaw, turnInEndYaw, localT);
    const blurPx = mix(BLUR_STRENGTH, BLUR_STRENGTH * 0.82, localT);
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
      fromOpacity: round3(sourceKind === 'cover' ? mix(0.22, 0.14, localT) : mix(0.68, 0.42, localT)),
      fromEdgeMix: round3(sourceKind === 'cover' ? 0.98 : mix(0.84, 0.94, localT)),
      targetFocus: round3(sourceKind === 'cover' ? mix(0.16, 0.26, localT) : mix(0.18, 0.3, localT)),
      wipeSoftness: WIPE_SOFTNESS,
      distortionStrength: DISTORTION_STRENGTH * (sourceKind === 'cover' ? 0.42 : 0.5),
      blurPx: round2(blurPx),
      glassAlpha: TARGET_NOT_READY_GLASS_ALPHA,
      motionBlurStrength: 0.035,
      fovDelta: round2(FOV_PULSE_IN * (0.6 + 0.4 * localT)),
      zoomScale: round4(1 + 0.012 * localT),
      fromShiftPercent: round2(plan.travelDirX * (sourceKind === 'cover' ? 1.8 : 1.4) * localT),
      toShiftPercent: round2(plan.travelDirX * 5.8 * (1 - localT)),
      shearDeg: round2(plan.travelDirX * (1.1 + plan.curveStrength * 2.6) * localT),
      curveStrength: plan.curveStrength,
      occlusionOpacity: round3((0.08 + plan.curveStrength * 0.12) * localT),
    };
  }

  if (normalizedProgress < settleStart) {
    const travelT = safeRatio(normalizedProgress - TURN_IN_RATIO, settleStart - TURN_IN_RATIO);
    const easedTravel = easeInOutCubic(travelT);
    const displayWorldYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, easedTravel);
    const midBell = bellCurve(travelT);
    const blurBase = targetReady
      ? mix(
          BLUR_STRENGTH * (sourceKind === 'cover' ? 0.54 : 0.38),
          BLUR_STRENGTH * 0.08,
          targetRevealState.revealProgress,
        )
      : BLUR_STRENGTH * (sourceKind === 'cover' ? 0.96 : 0.7);
    const blurPx = blurBase + BLUR_STRENGTH * 0.08 * midBell;
    const distortionStrength =
      DISTORTION_STRENGTH * (0.72 + 0.2 * midBell + plan.curveStrength * 0.12);
    const fromOpacity = targetReady
      ? sourceKind === 'cover'
        ? mix(0.16, 0.02, targetRevealState.targetMixProgress)
        : mix(0.36, 0.03, targetRevealState.targetMixProgress)
      : sourceKind === 'cover'
        ? 0.24
        : mix(0.28, 0.14, easedTravel);
    const fromEdgeMix = sourceKind === 'cover'
      ? 0.98
      : targetReady
        ? mix(0.82, 0.96, targetRevealState.targetMixProgress)
        : mix(0.92, 0.98, easedTravel);
    const targetFocus = targetReady
      ? targetRevealState.targetFocus
      : sourceKind === 'cover'
        ? 0.12
        : mix(0.28, 0.42, midBell);
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
      blurPx: round2(blurPx),
      glassAlpha: round3(targetReady ? DEFAULT_GLASS_ALPHA : TARGET_NOT_READY_GLASS_ALPHA),
      motionBlurStrength: round3(0.035 + midBell * 0.08),
      fovDelta: round2(resolveTravelFovDelta(normalizedProgress, settleStart)),
      zoomScale: round4(1 + 0.015 + midBell * 0.02),
      fromShiftPercent: round2(plan.travelDirX * mix(sourceKind === 'cover' ? 2.2 : 1.8, sourceKind === 'cover' ? 5.2 : 4.2, easedTravel)),
      toShiftPercent: round2(plan.travelDirX * mix(5.4, 0.4, targetRevealState.revealProgress)),
      shearDeg: round2(plan.travelDirX * (1.4 + plan.curveStrength * 3.4) * midBell),
      curveStrength: plan.curveStrength,
      occlusionOpacity: round3((0.1 + plan.curveStrength * (OCCLUSION_ALPHA * 0.8)) * midBell),
    };
  }

  const settleT = easeOutQuad(safeRatio(normalizedProgress - settleStart, 1 - settleStart));
  const settleStartYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, 1);
  const blurPx = targetReady ? mix(BLUR_STRENGTH * 0.18, 0, settleT) : BLUR_STRENGTH * 0.82;
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
              ? mix(0.08, 0.02, targetRevealState.targetMixProgress)
              : mix(0.12, 0.04, targetRevealState.targetMixProgress),
            0,
            settleT,
          )
        : (sourceKind === 'cover' ? 0.28 : 0.16),
    ),
    fromEdgeMix: round3(sourceKind === 'cover' ? 1 : (targetReady ? mix(0.9, 0.98, settleT) : 0.98)),
    targetFocus,
    wipeSoftness: round3(WIPE_SOFTNESS + plan.curveStrength * 0.02),
    distortionStrength: round3(DISTORTION_STRENGTH * (1 - settleT * 0.8)),
    blurPx: round2(blurPx),
    glassAlpha: round3(targetReady ? mix(DEFAULT_GLASS_ALPHA, 0.08, settleT) : TARGET_NOT_READY_GLASS_ALPHA),
    motionBlurStrength: round3(targetReady ? mix(0.08, 0, settleT) : 0.04),
    fovDelta: round2(mix(0.4, 0, settleT)),
    zoomScale: round4(mix(1.012, 1, settleT)),
    fromShiftPercent: round2(plan.travelDirX * mix(sourceKind === 'cover' ? 2.8 : 2.2, 0, settleT)),
    toShiftPercent: round2(plan.travelDirX * mix(0.8, 0, settleT)),
    shearDeg: round2(plan.travelDirX * mix(1.2 + plan.curveStrength * 1.8, 0, settleT)),
    curveStrength: plan.curveStrength,
    occlusionOpacity: round3(mix(0.1 + plan.curveStrength * 0.12, 0, settleT)),
  };
}

function resolveTravelFovDelta(progress: number, settleStart: number): number {
  if (progress <= 0.22) {
    return mix(0, FOV_PULSE_IN, easeOutCubic(safeRatio(progress, 0.22)));
  }
  if (progress <= 0.48) {
    return mix(
      FOV_PULSE_IN,
      FOV_PULSE_OUT,
      easeInOutCubic(safeRatio(progress - 0.22, 0.26)),
    );
  }
  if (progress <= settleStart) {
    return mix(
      FOV_PULSE_OUT,
      0.45,
      easeOutCubic(safeRatio(progress - 0.48, Math.max(settleStart - 0.48, 0.001))),
    );
  }
  return 0.45;
}

function resolveTargetRevealState({
  normalizedProgress,
  settleStart,
  targetReady,
  targetReadyProgress,
  sourceKind,
}: {
  normalizedProgress: number;
  settleStart: number;
  targetReady: boolean;
  targetReadyProgress?: number;
  sourceKind: 'scene' | 'cover';
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
    targetReadyProgress ?? TURN_IN_RATIO,
    0,
    Math.min(normalizedProgress, settleStart),
  );
  const readyWindow = Math.max((1 - readyProgress) * 0.85, 0.001);
  const readyDelta = Math.max(normalizedProgress - readyProgress, 0);
  const revealRatio = safeRatio(readyDelta, readyWindow);
  const revealProgress = easeInOutCubic(revealRatio);
  const mixLead = easeOutQuad(safeRatio(readyDelta, readyWindow * 1.08));
  const targetMixProgress = clamp(
    (sourceKind === 'cover' ? 0.03 : 0.02) +
      revealProgress * (sourceKind === 'cover' ? 0.86 : 0.82) +
      mixLead * (sourceKind === 'cover' ? 0.1 : 0.08),
    0,
    0.97,
  );
  const targetFocus = clamp(
    (sourceKind === 'cover' ? 0.23 : 0.14) +
      revealProgress * (sourceKind === 'cover' ? 0.69 : 0.58) +
      mixLead * (sourceKind === 'cover' ? 0.1 : 0.08),
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
