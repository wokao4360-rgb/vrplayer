import type { MapPoint } from '../types/config.ts';

export type SceneTransitionPlan = {
  durationMs: number;
  settleMs: number;
  travelDirX: -1 | 1;
  wipeFrom: 'left' | 'right';
  turnLead: number;
  curveStrength: number;
};

export type SceneTransitionIntent = {
  museumId: string;
  sceneId: string;
  view?: {
    yaw?: number;
    pitch?: number;
    fov?: number;
  };
};

export type TransitionIntentState = {
  active: SceneTransitionIntent | null;
  pending: SceneTransitionIntent | null;
};

type ComputeSceneTransitionPlanArgs = {
  currentWorldYaw: number;
  targetWorldYaw: number;
  hotspotScreenX?: number;
  fromMapPoint?: MapPoint;
  toMapPoint?: MapPoint;
};

const SHORT_HOP_MS = 480;
const MID_HOP_MS = 620;
const LARGE_TURN_MS = 760;
const TURN_LEAD_FACTOR = 0.32;
const MAX_TURN_LEAD_DEG = 18;

export function computeSceneTransitionPlan({
  currentWorldYaw,
  targetWorldYaw,
  hotspotScreenX,
  fromMapPoint,
  toMapPoint,
}: ComputeSceneTransitionPlanArgs): SceneTransitionPlan {
  const yawDelta = shortestAngleDelta(currentWorldYaw, targetWorldYaw);
  const travelDirX = resolveTravelDirX(yawDelta, hotspotScreenX, fromMapPoint, toMapPoint);
  const absYawDelta = Math.abs(yawDelta);
  const durationMs = resolveDurationMs(absYawDelta);
  const settleMs = durationMs >= LARGE_TURN_MS ? 140 : 120;
  const turnLead = round1(Math.min(MAX_TURN_LEAD_DEG, Math.max(0, absYawDelta * TURN_LEAD_FACTOR)));
  const curveStrength = round2(clamp(Math.max(0, absYawDelta - 12) / 40, 0, 1));

  return {
    durationMs,
    settleMs,
    travelDirX,
    wipeFrom: travelDirX > 0 ? 'right' : 'left',
    turnLead,
    curveStrength,
  };
}

export function createTransitionIntentState(): TransitionIntentState {
  return {
    active: null,
    pending: null,
  };
}

export function queueLatestTransitionIntent(
  state: TransitionIntentState,
  next: SceneTransitionIntent,
): TransitionIntentState {
  if (!state.active) {
    return { active: next, pending: null };
  }
  return { active: state.active, pending: next };
}

export function consumeQueuedTransitionIntent(
  state: TransitionIntentState,
): {
  next: SceneTransitionIntent | null;
  state: TransitionIntentState;
} {
  if (state.pending) {
    return {
      next: state.pending,
      state: {
        active: state.pending,
        pending: null,
      },
    };
  }
  return {
    next: null,
    state: {
      active: null,
      pending: null,
    },
  };
}

function resolveDurationMs(absYawDelta: number): number {
  if (absYawDelta < 18) {
    return SHORT_HOP_MS;
  }
  if (absYawDelta < 72) {
    return MID_HOP_MS;
  }
  return LARGE_TURN_MS;
}

function resolveTravelDirX(
  yawDelta: number,
  hotspotScreenX?: number,
  fromMapPoint?: MapPoint,
  toMapPoint?: MapPoint,
): -1 | 1 {
  if (Math.abs(yawDelta) >= 8) {
    return yawDelta >= 0 ? 1 : -1;
  }
  if (typeof hotspotScreenX === 'number' && Number.isFinite(hotspotScreenX)) {
    return hotspotScreenX < 0.5 ? -1 : 1;
  }
  if (fromMapPoint && toMapPoint && fromMapPoint.x !== toMapPoint.x) {
    return toMapPoint.x >= fromMapPoint.x ? 1 : -1;
  }
  return yawDelta >= 0 ? 1 : -1;
}

function shortestAngleDelta(from: number, to: number): number {
  let delta = to - from;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return delta;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round1(value: number): number {
  return Number(value.toFixed(1));
}

function round2(value: number): number {
  return Number(value.toFixed(2));
}

