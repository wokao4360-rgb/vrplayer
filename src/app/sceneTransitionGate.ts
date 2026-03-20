export type SceneTransitionReleaseMode = 'low' | 'high';

export type TransitionProgressState = {
  targetReady: boolean;
  lowReady: boolean;
  sharpReady: boolean;
  loadCommitted: boolean;
  failed: boolean;
  currentProgress: number;
  targetReadyAtTs: number | null;
  targetReadyProgress: number;
  releaseAtTs: number | null;
  releaseProgress: number;
};

export type TransitionProgressArgs = {
  ts: number;
  startTs: number;
  durationMs: number;
  settleMs: number;
  state: TransitionProgressState;
  releaseMode?: SceneTransitionReleaseMode;
};

export const TARGET_READY_HOLD_PROGRESS = 0.74;
export const POST_READY_DURATION_MS = 180;

export function isTransitionReleaseReady(
  state: Pick<TransitionProgressState, 'lowReady' | 'sharpReady' | 'failed'>,
  releaseMode: SceneTransitionReleaseMode = 'high',
): boolean {
  if (state.failed) {
    return true;
  }
  if (releaseMode === 'low') {
    return state.lowReady || state.sharpReady;
  }
  return state.sharpReady;
}

export function computeSceneTransitionProgress({
  ts,
  startTs,
  durationMs,
  settleMs,
  state,
  releaseMode = 'high',
}: TransitionProgressArgs): number {
  const baseHoldProgress = clamp(
    ((ts - startTs) / Math.max(durationMs, 1)) * TARGET_READY_HOLD_PROGRESS,
    0,
    TARGET_READY_HOLD_PROGRESS,
  );

  if (!state.targetReady || state.targetReadyAtTs == null) {
    return baseHoldProgress;
  }

  const targetReadyProgress = clamp(
    Math.max(state.targetReadyProgress, baseHoldProgress, state.currentProgress),
    0,
    TARGET_READY_HOLD_PROGRESS,
  );

  if (!isTransitionReleaseReady(state, releaseMode) || state.releaseAtTs == null) {
    return targetReadyProgress;
  }

  const releaseElapsed = ts - state.releaseAtTs;
  const releaseProgress = clamp(
    Math.max(state.releaseProgress, targetReadyProgress),
    0,
    TARGET_READY_HOLD_PROGRESS,
  );
  return clamp(
    releaseProgress +
      (releaseElapsed / Math.max(settleMs + POST_READY_DURATION_MS, 1)) *
        (1 - releaseProgress),
    0,
    1,
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
