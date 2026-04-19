import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSceneTransitionCameraView } from '../src/app/sceneTransitionCamera.ts';
import { computeSceneTransitionPlan } from '../src/app/sceneTransitionMath.ts';
import { buildSceneTransitionFrame } from '../src/app/sceneTransitionTimeline.ts';

test('pre-commit camera keeps most pitch/fov on current scene while turning in', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 42,
  });
  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 42,
    plan,
    progress: 0.08,
    targetReady: false,
  });

  const view = buildSceneTransitionCameraView({
    frame,
    currentWorldView: { yaw: 0, pitch: 10, fov: 78 },
    targetWorldView: { yaw: 42, pitch: -18, fov: 66 },
    loadCommitted: false,
  });

  assert.ok(view.yaw > 0);
  assert.ok(view.yaw < 42);
  assert.ok(view.pitch > 6);
  assert.ok(view.pitch < 10);
  assert.ok(view.fov < 78);
  assert.ok(view.fov > 70);
});

test('post-commit camera continues settling toward target pitch and fov', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 48,
  });
  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 48,
    plan,
    progress: 0.9,
    targetReady: true,
  });

  const view = buildSceneTransitionCameraView({
    frame,
    currentWorldView: { yaw: 0, pitch: 14, fov: 78 },
    targetWorldView: { yaw: 48, pitch: -12, fov: 64 },
    loadCommitted: true,
  });

  assert.ok(view.yaw > 30);
  assert.ok(view.yaw <= 48);
  assert.ok(view.pitch < -6);
  assert.ok(view.pitch > -12.1);
  assert.ok(view.fov < 68);
  assert.ok(view.fov > 63.5);
});

test('transition camera returns exact target view at final frame', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: -36,
    targetWorldYaw: 22,
  });
  const frame = buildSceneTransitionFrame({
    currentWorldYaw: -36,
    targetWorldYaw: 22,
    plan,
    progress: 1,
    targetReady: true,
  });

  const view = buildSceneTransitionCameraView({
    frame,
    currentWorldView: { yaw: -36, pitch: 18, fov: 84 },
    targetWorldView: { yaw: 22, pitch: -6, fov: 68 },
    loadCommitted: true,
  });

  assert.deepEqual(view, { yaw: 22, pitch: -6, fov: 68 });
});

test('long straight hop adds a forward-drive pitch pulse instead of feeling like pure zoom', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 0,
    fromMapPoint: { x: 650, y: 2170 },
    toMapPoint: { x: 650, y: 1660 },
  });
  const frame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 0,
    plan,
    progress: 0.22,
    targetReady: false,
  });

  const view = buildSceneTransitionCameraView({
    frame,
    currentWorldView: { yaw: 0, pitch: 0, fov: 75 },
    targetWorldView: { yaw: 0, pitch: 0, fov: 75 },
    loadCommitted: false,
  });

  assert.equal(frame.wipeFrom, 'center');
  assert.ok(plan.forwardDriveStrength >= 0.75);
  assert.notEqual(view.pitch, 0);
  assert.ok(view.pitch < -1.2);
});
