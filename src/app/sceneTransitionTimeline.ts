import type { SceneTransitionPlan } from './sceneTransitionMath.ts';

export type SceneTransitionStage = 'turn-in' | 'travel' | 'settle';

export type SceneTransitionFrame = {
  stage: SceneTransitionStage;
  displayWorldYaw: number;
  travelDirX: -1 | 1;
  wipeFrom: 'left' | 'right';
  revealProgress: number;
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
};

export const TURN_IN_RATIO = 0.22;
export const WIPE_SOFTNESS = 0.16;
export const DISTORTION_STRENGTH = 0.22;
export const BLUR_STRENGTH = 24;
export const FOV_PULSE_IN = -3.4;
export const FOV_PULSE_OUT = 1.9;

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
      stage: 'turn-in',
      displayWorldYaw,
      travelDirX: plan.travelDirX,
      wipeFrom: plan.wipeFrom,
      revealProgress: 0,
      wipeSoftness: WIPE_SOFTNESS,
      distortionStrength: DISTORTION_STRENGTH * 0.55,
      blurPx: round2(blurPx),
      glassAlpha: TARGET_NOT_READY_GLASS_ALPHA,
      motionBlurStrength: 0.08,
      fovDelta: round2(FOV_PULSE_IN * (0.6 + 0.4 * localT)),
      zoomScale: round4(1 + 0.012 * localT),
      fromShiftPercent: round2(plan.travelDirX * 1.6 * localT),
      toShiftPercent: round2(plan.travelDirX * 5.8 * (1 - localT)),
      shearDeg: round2(plan.travelDirX * (1.8 + plan.curveStrength * 3.6) * localT),
      curveStrength: plan.curveStrength,
      occlusionOpacity: round3((0.08 + plan.curveStrength * 0.12) * localT),
    };
  }

  if (normalizedProgress < settleStart) {
    const travelT = safeRatio(normalizedProgress - TURN_IN_RATIO, settleStart - TURN_IN_RATIO);
    const easedTravel = easeInOutCubic(travelT);
    const displayWorldYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, easedTravel);
    const revealProgress = targetReady
      ? clamp((easedTravel - 0.08) / 0.82, 0, 1)
      : 0;
    const midBell = bellCurve(travelT);
    const blurBase = targetReady
      ? mix(BLUR_STRENGTH * 0.82, BLUR_STRENGTH * 0.2, revealProgress)
      : BLUR_STRENGTH * 0.72;
    const blurPx = blurBase + BLUR_STRENGTH * 0.08 * midBell;
    const distortionStrength =
      DISTORTION_STRENGTH * (0.82 + 0.72 * midBell + plan.curveStrength * 0.3);
    return {
      stage: 'travel',
      displayWorldYaw,
      travelDirX: plan.travelDirX,
      wipeFrom: plan.wipeFrom,
      revealProgress: round3(revealProgress),
      wipeSoftness: round3(WIPE_SOFTNESS + plan.curveStrength * 0.06),
      distortionStrength: round3(distortionStrength),
      blurPx: round2(blurPx),
      glassAlpha: round3(targetReady ? DEFAULT_GLASS_ALPHA : TARGET_NOT_READY_GLASS_ALPHA),
      motionBlurStrength: round3(0.1 + midBell * 0.22),
      fovDelta: round2(resolveTravelFovDelta(normalizedProgress, settleStart)),
      zoomScale: round4(1 + 0.015 + midBell * 0.02),
      fromShiftPercent: round2(plan.travelDirX * mix(1.8, 5.6, easedTravel)),
      toShiftPercent: round2(plan.travelDirX * mix(5.4, 0.4, revealProgress)),
      shearDeg: round2(plan.travelDirX * (2.1 + plan.curveStrength * 5.2) * midBell),
      curveStrength: plan.curveStrength,
      occlusionOpacity: round3((0.12 + plan.curveStrength * OCCLUSION_ALPHA) * midBell),
    };
  }

  const settleT = easeOutQuad(safeRatio(normalizedProgress - settleStart, 1 - settleStart));
  const settleStartYaw = interpolateAngle(turnInEndYaw, targetWorldYaw, 1);
  const blurPx = targetReady ? mix(BLUR_STRENGTH * 0.18, 0, settleT) : BLUR_STRENGTH * 0.7;
  const revealProgress = targetReady ? 1 : 0;
  return {
    stage: 'settle',
    displayWorldYaw: interpolateAngle(settleStartYaw, targetWorldYaw, settleT),
    travelDirX: plan.travelDirX,
    wipeFrom: plan.wipeFrom,
    revealProgress,
    wipeSoftness: round3(WIPE_SOFTNESS + plan.curveStrength * 0.04),
    distortionStrength: round3(DISTORTION_STRENGTH * (1 - settleT * 0.72)),
    blurPx: round2(blurPx),
    glassAlpha: round3(targetReady ? mix(DEFAULT_GLASS_ALPHA, 0.08, settleT) : TARGET_NOT_READY_GLASS_ALPHA),
    motionBlurStrength: round3(targetReady ? mix(0.12, 0, settleT) : 0.06),
    fovDelta: round2(mix(0.4, 0, settleT)),
    zoomScale: round4(mix(1.012, 1, settleT)),
    fromShiftPercent: round2(plan.travelDirX * mix(2.2, 0, settleT)),
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
