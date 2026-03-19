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

  assert.equal(plan.durationMs, 480);
  assert.equal(plan.travelDirX, 1);
  assert.equal(plan.wipeFrom, 'right');
  assert.equal(plan.turnLead, 2.7);
  assert.equal(plan.curveStrength, 0);
});

test('medium side hop biases into a curved travel heading', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 34,
    fromMapPoint: { x: 100, y: 100 },
    toMapPoint: { x: 210, y: 130 },
  });

  assert.equal(plan.durationMs, 620);
  assert.equal(plan.travelDirX, 1);
  assert.equal(plan.wipeFrom, 'right');
  assert.ok(plan.turnLead > 14 && plan.turnLead < 16);
  assert.ok(plan.curveStrength > 0.5);
});

test('large left turn uses large-turn duration and left-origin wipe', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 12,
    targetWorldYaw: -92,
    fromMapPoint: { x: 320, y: 180 },
    toMapPoint: { x: 120, y: 360 },
  });

  assert.equal(plan.durationMs, 760);
  assert.equal(plan.travelDirX, -1);
  assert.equal(plan.wipeFrom, 'left');
  assert.equal(plan.turnLead, 28);
  assert.equal(plan.settleMs, 140);
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
