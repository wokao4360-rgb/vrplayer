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
const DEFAULT_GLASS_ALPHA = 0.22;
const TARGET_NOT_READY_GLASS_ALPHA = 0.3;
const OCCLUSION_ALPHA = 0.34;

export function buildSceneTransitionFrame({
  currentWorldYaw,
  targetWorldYaw,
  plan,
  progress,
  targetReady,
  sourceKind = 'scene',
}: BuildSceneTransitionFrameArgs): SceneTransitionFrame {
  const normalizedProgress = clamp(progress, 0, 1);
  const totalMs = plan.durationMs + plan.settleMs;
  const settleRatio = clamp(plan.settleMs / Math.max(totalMs, 1), SETTLE_RATIO_MIN, SETTLE_RATIO_MAX);
  const settleStart = 1 - settleRatio;
  const turnInEndYaw = normalizeSignedAngle(
    currentWorldYaw + plan.travelDirX * plan.turnLead,
  );

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
      fromOpacity: round3(sourceKind === 'cover' ? mix(0.22, 0.14, localT) : mix(0.88, 0.68, localT)),
      fromEdgeMix: round3(sourceKind === 'cover' ? 0.98 : mix(0.62, 0.84, localT)),
      targetFocus: round3(sourceKind === 'cover' ? mix(0.16, 0.26, localT) : mix(0.08, 0.18, localT)),
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
    const revealProgress = targetReady
      ? clamp((easedTravel - 0.0) / 0.66, 0, 1)
      : 0;
    const midBell = bellCurve(travelT);
    const targetMixProgress = targetReady
      ? clamp(
          Math.max(
            (sourceKind === 'cover' ? 0.42 : 0.28) + easedTravel * (sourceKind === 'cover' ? 0.5 : 0.58),
            (sourceKind === 'cover' ? 0.46 : 0.3) + revealProgress * (sourceKind === 'cover' ? 0.6 : 0.66),
            0.18 + midBell * 0.16,
          ),
          0,
          0.97,
        )
      : 0;
    const blurBase = targetReady
      ? mix(BLUR_STRENGTH * (sourceKind === 'cover' ? 0.54 : 0.62), BLUR_STRENGTH * 0.12, revealProgress)
      : BLUR_STRENGTH * (sourceKind === 'cover' ? 0.96 : 0.98);
    const blurPx = blurBase + BLUR_STRENGTH * 0.08 * midBell;
    const distortionStrength =
      DISTORTION_STRENGTH * (0.72 + 0.2 * midBell + plan.curveStrength * 0.12);
    const fromOpacity = targetReady
      ? sourceKind === 'cover'
        ? mix(0.16, 0.02, targetMixProgress)
        : mix(0.44, 0.06, targetMixProgress)
      : sourceKind === 'cover'
        ? 0.24
        : mix(0.62, 0.44, easedTravel);
    const fromEdgeMix = sourceKind === 'cover'
      ? 0.98
      : targetReady
        ? mix(0.74, 0.94, targetMixProgress)
        : mix(0.82, 0.9, easedTravel);
    const targetFocus = targetReady
      ? sourceKind === 'cover'
        ? clamp(0.48 + targetMixProgress * 0.58, 0, 1)
        : clamp(0.32 + targetMixProgress * 0.56, 0, 1)
      : sourceKind === 'cover'
        ? 0.12
        : mix(0.14, 0.24, midBell);
    return {
      progress: round4(normalizedProgress),
      stageProgress: round4(easedTravel),
      targetReady,
      stage: 'travel',
      sourceKind,
      displayWorldYaw,
      travelDirX: plan.travelDirX,
      wipeFrom: plan.wipeFrom,
      revealProgress: round3(revealProgress),
      targetMixProgress: round3(targetMixProgress),
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
      toShiftPercent: round2(plan.travelDirX * mix(5.4, 0.4, revealProgress)),
      shearDeg: round2(plan.travelDirX * (1.4 + plan.curveStrength * 3.4) * midBell),
      curveStrength: plan.curveStrength,
      occlusionOpacity: round3((0.1 + plan.curveStrength * (OCCLUSION_ALPHA * 0.8)) * midBell),
    };
  }

  const settleT = easeOutQuad(safeRatio(normalizedProgress - settleStart, 1 - settleStart));
  const settleStartYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, 1);
  const blurPx = targetReady ? mix(BLUR_STRENGTH * 0.18, 0, settleT) : BLUR_STRENGTH * 0.96;
  const revealProgress = targetReady ? 1 : 0;
  const targetMixProgress = targetReady ? 1 : 0;
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
    fromOpacity: round3(targetReady ? mix(sourceKind === 'cover' ? 0.04 : 0.08, 0, settleT) : (sourceKind === 'cover' ? 0.28 : 0.42)),
    fromEdgeMix: round3(sourceKind === 'cover' ? 1 : mix(0.84, 0.96, settleT)),
    targetFocus: round3(targetReady ? 1 : 0.14),
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
