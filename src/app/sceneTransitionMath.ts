import type { MapPoint } from '../types/config.ts';

export type SceneTransitionPlan = {
  durationMs: number;
  settleMs: number;
  travelDirX: -1 | 1;
  wipeFrom: 'left' | 'right' | 'center';
  turnLead: number;
  curveStrength: number;
  forwardDriveStrength: number;
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

const SHORT_HOP_MS = 720;
const MID_HOP_MS = 900;
const LARGE_TURN_MS = 1040;
const TURN_LEAD_FACTOR = 0.62;
const MAX_TURN_LEAD_DEG = 36;

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
  const directionalIntent = resolveDirectionalIntent(hotspotScreenX, fromMapPoint, toMapPoint);
  const travelStrength = resolveTravelStrength(fromMapPoint, toMapPoint);
  const forwardDriveStrength = round2(resolveForwardDriveStrength(absYawDelta, directionalIntent, travelStrength));
  const forwardRevealMode = absYawDelta < 8 && directionalIntent < 0.18 && travelStrength >= 0.52;
  const durationMs = resolveDurationMs(absYawDelta, travelStrength);
  const settleMs = durationMs >= LARGE_TURN_MS ? 140 : 120;
  const turnLead = round1(
    Math.min(
      MAX_TURN_LEAD_DEG,
      Math.max(
        0,
        absYawDelta >= 8
          ? absYawDelta * TURN_LEAD_FACTOR
          : directionalIntent > 0
            ? 10 + directionalIntent * 14
            : 0,
      ),
    ),
  );
  const curveStrength = round2(
    clamp(
      Math.max(
        absYawDelta >= 8
        ? Math.max(0, absYawDelta - 8) / 26
        : directionalIntent * 0.72,
        travelStrength * 0.78,
      ),
      0,
      1,
    ),
  );

  return {
    durationMs,
    settleMs,
    travelDirX,
    wipeFrom: forwardRevealMode ? 'center' : travelDirX > 0 ? 'right' : 'left',
    turnLead,
    curveStrength,
    forwardDriveStrength,
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

function resolveDurationMs(absYawDelta: number, travelStrength: number): number {
  if (absYawDelta < 18) {
    if (travelStrength >= 0.82) {
      return LARGE_TURN_MS;
    }
    if (travelStrength >= 0.52) {
      return MID_HOP_MS + 80;
    }
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

function resolveDirectionalIntent(
  hotspotScreenX?: number,
  fromMapPoint?: MapPoint,
  toMapPoint?: MapPoint,
): number {
  if (typeof hotspotScreenX === 'number' && Number.isFinite(hotspotScreenX)) {
    const screenStrength = clamp(Math.abs(hotspotScreenX - 0.5) * 2, 0, 1);
    if (screenStrength >= 0.18) {
      return screenStrength;
    }
  }
  if (fromMapPoint && toMapPoint) {
    const deltaX = Math.abs(toMapPoint.x - fromMapPoint.x);
    if (deltaX >= 36) {
      return clamp((deltaX - 36) / 180, 0.18, 1);
    }
  }
  return 0;
}

function resolveTravelStrength(
  fromMapPoint?: MapPoint,
  toMapPoint?: MapPoint,
): number {
  if (!fromMapPoint || !toMapPoint) {
    return 0;
  }
  const dx = toMapPoint.x - fromMapPoint.x;
  const dy = toMapPoint.y - fromMapPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return clamp((distance - 90) / 520, 0, 1);
}

function resolveForwardDriveStrength(
  absYawDelta: number,
  directionalIntent: number,
  travelStrength: number,
): number {
  const straightBias = 1 - clamp(absYawDelta / 24, 0, 1);
  const travelLift = travelStrength * (0.58 + straightBias * 0.68);
  const directionalLift = directionalIntent * (0.3 + straightBias * 0.38);
  const straightHopBoost =
    straightBias * clamp((travelStrength - 0.22) / 0.78, 0, 1) * 0.18;
  return clamp(
    Math.max(travelLift, directionalLift) + straightHopBoost,
    0,
    1,
  );
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
