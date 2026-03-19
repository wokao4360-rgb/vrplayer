import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TARGET_READY_HOLD_PROGRESS,
  computeSceneTransitionProgress,
  isTransitionReleaseReady,
  type TransitionProgressState,
} from '../src/app/sceneTransitionGate.ts';

function createState(
  overrides: Partial<TransitionProgressState> = {},
): TransitionProgressState {
  return {
    targetReady: false,
    lowReady: false,
    sharpReady: false,
    loadCommitted: false,
    failed: false,
    currentProgress: 0,
    targetReadyAtTs: null,
    targetReadyProgress: 0,
    releaseAtTs: null,
    releaseProgress: 0,
    ...overrides,
  };
}

test('high release mode holds transition even after target low preview is ready', () => {
  const state = createState({
    targetReady: true,
    lowReady: true,
    currentProgress: 0.61,
    targetReadyAtTs: 120,
    targetReadyProgress: 0.21,
  });

  const progress = computeSceneTransitionProgress({
    ts: 1800,
    startTs: 0,
    durationMs: 620,
    settleMs: 120,
    state,
    releaseMode: 'high',
  });

  assert.equal(isTransitionReleaseReady(state, 'high'), false);
  assert.equal(progress, TARGET_READY_HOLD_PROGRESS);
});

test('low release mode may continue once low scene is ready', () => {
  const state = createState({
    targetReady: true,
    lowReady: true,
    currentProgress: 0.4,
    targetReadyAtTs: 120,
    targetReadyProgress: 0.18,
    releaseAtTs: 640,
    releaseProgress: TARGET_READY_HOLD_PROGRESS,
  });

  const progress = computeSceneTransitionProgress({
    ts: 760,
    startTs: 0,
    durationMs: 620,
    settleMs: 120,
    state,
    releaseMode: 'low',
  });

  assert.equal(isTransitionReleaseReady(state, 'low'), true);
  assert.ok(progress > TARGET_READY_HOLD_PROGRESS);
  assert.ok(progress < 1);
});

test('high release mode only exits hold after sharp ready or failure fallback', () => {
  const sharpReadyState = createState({
    targetReady: true,
    lowReady: true,
    sharpReady: true,
    currentProgress: 0.72,
    targetReadyAtTs: 140,
    targetReadyProgress: 0.22,
    releaseAtTs: 760,
    releaseProgress: TARGET_READY_HOLD_PROGRESS,
  });
  const failedState = createState({
    targetReady: true,
    failed: true,
    currentProgress: 0.72,
    targetReadyAtTs: 140,
    targetReadyProgress: 0.22,
    releaseAtTs: 760,
    releaseProgress: TARGET_READY_HOLD_PROGRESS,
  });

  assert.equal(isTransitionReleaseReady(sharpReadyState, 'high'), true);
  assert.equal(isTransitionReleaseReady(failedState, 'high'), true);
});
