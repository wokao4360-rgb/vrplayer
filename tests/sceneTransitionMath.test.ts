import test from 'node:test';
import assert from 'node:assert/strict';

import {
  computeSceneTransitionPlan,
  createTransitionIntentState,
  queueLatestTransitionIntent,
  consumeQueuedTransitionIntent,
  type SceneTransitionIntent,
} from '../src/app/sceneTransitionMath.ts';

test('small forward hop keeps short duration with no artificial arc', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 4,
    targetWorldYaw: 10,
    fromMapPoint: { x: 120, y: 200 },
    toMapPoint: { x: 138, y: 204 },
  });

  assert.equal(plan.durationMs, 720);
  assert.equal(plan.travelDirX, 1);
  assert.equal(plan.wipeFrom, 'right');
  assert.equal(plan.turnLead, 0);
  assert.equal(plan.curveStrength, 0);
  assert.equal(plan.forwardDriveStrength, 0);
});

test('medium side hop biases into a curved travel heading', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 34,
    fromMapPoint: { x: 100, y: 100 },
    toMapPoint: { x: 210, y: 130 },
  });

  assert.equal(plan.durationMs, 900);
  assert.equal(plan.travelDirX, 1);
  assert.equal(plan.wipeFrom, 'right');
  assert.ok(plan.turnLead > 20 && plan.turnLead < 22);
  assert.ok(plan.curveStrength > 0.5);
  assert.ok(plan.forwardDriveStrength >= 0.02);
});

test('large left turn uses large-turn duration and left-origin wipe', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 12,
    targetWorldYaw: -92,
    fromMapPoint: { x: 320, y: 180 },
    toMapPoint: { x: 120, y: 360 },
  });

  assert.equal(plan.durationMs, 1040);
  assert.equal(plan.travelDirX, -1);
  assert.equal(plan.wipeFrom, 'left');
  assert.equal(plan.turnLead, 36);
  assert.equal(plan.settleMs, 140);
  assert.ok(plan.forwardDriveStrength >= 0.16);
});

test('screen-space hotspot offset decides wipe side when yaw delta is tiny', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 2,
    targetWorldYaw: 6,
    hotspotScreenX: 0.18,
  });

  assert.equal(plan.travelDirX, -1);
  assert.equal(plan.wipeFrom, 'left');
});

test('tiny yaw delta still gets directional lead when lateral map relation is strong', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 4,
    fromMapPoint: { x: 40, y: 80 },
    toMapPoint: { x: 220, y: 92 },
  });

  assert.equal(plan.travelDirX, 1);
  assert.ok(plan.turnLead >= 18);
  assert.ok(plan.curveStrength >= 0.5);
  assert.ok(plan.forwardDriveStrength >= 0.3);
});

test('tiny yaw delta still gets a stronger travel phase when map distance is long', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 0,
    fromMapPoint: { x: 650, y: 2170 },
    toMapPoint: { x: 650, y: 1660 },
  });

  assert.equal(plan.durationMs, 980);
  assert.equal(plan.turnLead, 0);
  assert.equal(plan.wipeFrom, 'center');
  assert.ok(plan.curveStrength >= 0.55);
  assert.ok(plan.forwardDriveStrength >= 0.75);
});

test('transition intent queue keeps only the latest pending click while active', () => {
  let state = createTransitionIntentState();
  const first: SceneTransitionIntent = { museumId: 'wangding', sceneId: 'south_gate' };
  const second: SceneTransitionIntent = { museumId: 'wangding', sceneId: 'west_room_1' };
  const third: SceneTransitionIntent = { museumId: 'wangding', sceneId: 'culture_achievement' };

  state = queueLatestTransitionIntent(state, first);
  assert.deepEqual(state.active, first);
  assert.equal(state.pending, null);

  state = queueLatestTransitionIntent(state, second);
  assert.deepEqual(state.active, first);
  assert.deepEqual(state.pending, second);

  state = queueLatestTransitionIntent(state, third);
  assert.deepEqual(state.active, first);
  assert.deepEqual(state.pending, third);

  const consumed = consumeQueuedTransitionIntent(state);
  assert.deepEqual(consumed.next, third);
  assert.deepEqual(consumed.state.active, third);
  assert.equal(consumed.state.pending, null);
});
