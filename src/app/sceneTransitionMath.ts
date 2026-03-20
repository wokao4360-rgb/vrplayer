import type { MapPoint } from '../types/config.ts';

export type SceneTransitionIntent = {
  museumId: string;
  sceneId: string;
  view?: {
    yaw?: number;
    pitch?: number;
    fov?: number;
  };
};

export type SceneTransitionIntentState = {
  active: SceneTransitionIntent | null;
  pending: SceneTransitionIntent | null;
};

export type SceneTransitionPlan = {
  deltaYaw: number;
  travelDirX: -1 | 1;
  wipeFrom: 'left' | 'right';
  curveStrength: number;
  turnLead: number;
  durationMs: number;
  settleMs: number;
};

export type ComputeSceneTransitionPlanArgs = {
  currentWorldYaw: number;
  targetWorldYaw: number;
  hotspotScreenX?: number;
  fromMapPoint?: MapPoint;
  toMapPoint?: MapPoint;
};

export const SHORT_HOP_MS = 480;
export const MID_HOP_MS = 620;
export const LARGE_TURN_MS = 760;
export const MIN_HOP_MS = 420;
export const MAX_HOP_MS = 850;
export const SETTLE_MS = 120;
export const LARGE_TURN_SETTLE_MS = 140;
export const TURN_LEAD_FACTOR = 0.32;
export const MAX_TURN_LEAD_DEG = 18;

export function shortestAngleDelta(fromDeg: number, toDeg: number): number {
  let delta = (toDeg - fromDeg) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return Number(delta.toFixed(2));
}

export function computeSceneTransitionPlan(
  args: ComputeSceneTransitionPlanArgs,
): SceneTransitionPlan {
  const deltaYaw = shortestAngleDelta(args.currentWorldYaw, args.targetWorldYaw);
  const absDelta = Math.abs(deltaYaw);
  const travelDirX = resolveTravelDirX(deltaYaw, args.hotspotScreenX);
  const mapDistance = resolveMapDistance(args.fromMapPoint, args.toMapPoint);
  const durationMs = resolveDuration(absDelta, mapDistance);
  const turnLead = Number(
    Math.min(absDelta * TURN_LEAD_FACTOR, MAX_TURN_LEAD_DEG).toFixed(1),
  );
  const curveStrength =
    absDelta < 18 ? 0 : Number(Math.min(absDelta / 60, 1).toFixed(2));

  return {
    deltaYaw,
    travelDirX,
    wipeFrom: travelDirX > 0 ? 'right' : 'left',
    curveStrength,
    turnLead,
    durationMs,
    settleMs: durationMs >= LARGE_TURN_MS ? LARGE_TURN_SETTLE_MS : SETTLE_MS,
  };
}

export function createTransitionIntentState(): SceneTransitionIntentState {
  return {
    active: null,
    pending: null,
  };
}

export function queueLatestTransitionIntent(
  state: SceneTransitionIntentState,
  next: SceneTransitionIntent,
): SceneTransitionIntentState {
  if (!state.active) {
    return {
      active: next,
      pending: null,
    };
  }
  return {
    active: state.active,
    pending: next,
  };
}

export function consumeQueuedTransitionIntent(state: SceneTransitionIntentState): {
  next: SceneTransitionIntent | null;
  state: SceneTransitionIntentState;
} {
  if (!state.pending) {
    return {
      next: null,
      state: {
        active: null,
        pending: null,
      },
    };
  }
  return {
    next: state.pending,
    state: {
      active: state.pending,
      pending: null,
    },
  };
}

function resolveTravelDirX(deltaYaw: number, hotspotScreenX?: number): -1 | 1 {
  const absDelta = Math.abs(deltaYaw);
  if (absDelta >= 8) {
    return deltaYaw >= 0 ? 1 : -1;
  }
  if (typeof hotspotScreenX === 'number') {
    return hotspotScreenX >= 0.5 ? 1 : -1;
  }
  return deltaYaw >= 0 ? 1 : -1;
}

function resolveMapDistance(fromMapPoint?: MapPoint, toMapPoint?: MapPoint): number {
  if (!fromMapPoint || !toMapPoint) {
    return 0;
  }
  const dx = toMapPoint.x - fromMapPoint.x;
  const dy = toMapPoint.y - fromMapPoint.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function resolveDuration(absDelta: number, mapDistance: number): number {
  if (absDelta >= 60 || mapDistance >= 220) {
    return LARGE_TURN_MS;
  }
  if (absDelta >= 18 || mapDistance >= 70) {
    return MID_HOP_MS;
  }
  return clampDuration(SHORT_HOP_MS);
}

function clampDuration(durationMs: number): number {
  return Math.max(MIN_HOP_MS, Math.min(MAX_HOP_MS, durationMs));
}
