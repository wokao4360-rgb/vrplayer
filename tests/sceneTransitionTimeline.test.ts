import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BLUR_STRENGTH,
  DISTORTION_STRENGTH,
  FOV_PULSE_IN,
  FOV_PULSE_OUT,
  TURN_IN_RATIO,
  WIPE_SOFTNESS,
  buildSceneTransitionFrame,
} from '../src/app/sceneTransitionTimeline.ts';
import { computeSceneTransitionPlan } from '../src/app/sceneTransitionMath.ts';

test('turn-in stage leads toward travel heading before main wipe starts', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 44,
  });

  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 44,
    plan,
    progress: TURN_IN_RATIO * 0.5,
    targetReady: false,
  });

  assert.equal(frame.stage, 'turn-in');
  assert.ok(frame.displayWorldYaw > 0);
  assert.ok(frame.displayWorldYaw < 44);
  assert.equal(frame.revealProgress, 0);
  assert.ok(frame.blurPx > BLUR_STRENGTH * 0.7);
  assert.ok(frame.fovDelta < 0);
});

test('main travel stage drives reveal from right side with strong seam distortion', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 34,
  });

  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 34,
    plan,
    progress: 0.52,
    targetReady: true,
  });

  assert.equal(frame.stage, 'travel');
  assert.equal(frame.wipeFrom, 'right');
  assert.ok(frame.revealProgress > 0.35 && frame.revealProgress < 0.75);
  assert.ok(frame.targetMixProgress > frame.revealProgress);
  assert.ok(frame.targetMixProgress < 1);
  assert.ok(frame.settleStrength < 0.35);
  assert.ok(frame.wipeSoftness >= WIPE_SOFTNESS);
  assert.ok(frame.distortionStrength >= DISTORTION_STRENGTH * 0.8);
  assert.ok(frame.fovDelta > 0);
  assert.equal(frame.travelDirX, 1);
});

test('left-biased transition reveals from left and settles exactly on target yaw/fov', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 48,
    targetWorldYaw: -36,
  });

  const settleFrame = buildSceneTransitionFrame({
    currentWorldYaw: 48,
    targetWorldYaw: -36,
    plan,
    progress: 0.95,
    targetReady: true,
  });

  assert.equal(settleFrame.wipeFrom, 'left');
  assert.equal(settleFrame.travelDirX, -1);
  assert.equal(settleFrame.stage, 'settle');
  assert.ok(settleFrame.displayWorldYaw < 0);
  assert.ok(settleFrame.blurPx < BLUR_STRENGTH * 0.35);

  const finalFrame = buildSceneTransitionFrame({
    currentWorldYaw: 48,
    targetWorldYaw: -36,
    plan,
    progress: 1,
    targetReady: true,
  });

  assert.equal(finalFrame.displayWorldYaw, -36);
  assert.equal(finalFrame.fovDelta, 0);
  assert.equal(finalFrame.blurPx, 0);
  assert.equal(finalFrame.revealProgress, 1);
  assert.equal(finalFrame.targetMixProgress, 1);
  assert.equal(finalFrame.settleStrength, 1);
});

test('when target is not ready, transition keeps previous scene disguise and delays reveal', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 22,
  });

  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 22,
    plan,
    progress: 0.7,
    targetReady: false,
  });

  assert.equal(frame.stage, 'travel');
  assert.equal(frame.revealProgress, 0);
  assert.equal(frame.targetMixProgress, 0);
  assert.equal(frame.settleStrength, 0);
  assert.ok(frame.blurPx > BLUR_STRENGTH * 0.5);
  assert.ok(frame.glassAlpha > 0.2);
});

test('fov pulse contracts first then rebounds during travel before returning to zero', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 26,
  });

  const early = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 26,
    plan,
    progress: 0.1,
    targetReady: false,
  });
  const mid = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 26,
    plan,
    progress: 0.48,
    targetReady: true,
  });
  const late = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 26,
    plan,
    progress: 0.98,
    targetReady: true,
  });

  assert.ok(early.fovDelta <= FOV_PULSE_IN * 0.4);
  assert.ok(mid.fovDelta >= FOV_PULSE_OUT * 0.45);
  assert.ok(late.fovDelta <= 0.4);
});
