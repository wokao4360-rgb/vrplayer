import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildSameMuseumSceneMotion,
  sampleSameMuseumSceneMotion,
} from '../src/app/sceneMotion.ts';

test('same-museum motion commits in the front half instead of the last frame', () => {
  const motion = buildSameMuseumSceneMotion({
    currentYaw: 12,
    currentPitch: 3,
    currentFov: 75,
    targetYaw: 48,
    targetPitch: 6,
    targetFov: 71,
  });

  assert.ok(motion.totalMs >= 420);
  assert.ok(motion.totalMs <= 560);
  assert.ok(motion.commitMs >= 120);
  assert.ok(motion.commitMs < motion.totalMs * 0.5);
});

test('same-museum motion drives yaw in one direction without rebound', () => {
  const motion = buildSameMuseumSceneMotion({
    currentYaw: -18,
    currentPitch: 0,
    currentFov: 75,
    targetYaw: 42,
    targetPitch: 4,
    targetFov: 72,
  });

  const samples = [0, 60, 120, 180, 260, 360, motion.totalMs].map((timeMs) =>
    sampleSameMuseumSceneMotion(motion, timeMs),
  );

  for (let index = 1; index < samples.length; index += 1) {
    assert.ok(samples[index].yaw >= samples[index - 1].yaw);
  }
});

test('same-museum motion keeps the early phase close to current view before handoff', () => {
  const motion = buildSameMuseumSceneMotion({
    currentYaw: 90,
    currentPitch: -4,
    currentFov: 75,
    targetYaw: 120,
    targetPitch: -2,
    targetFov: 70,
  });

  const early = sampleSameMuseumSceneMotion(motion, 80);
  const commit = sampleSameMuseumSceneMotion(motion, motion.commitMs);

  assert.ok(Math.abs(early.yaw - 90) < Math.abs(commit.yaw - 90));
  assert.ok(commit.didCommit);
});
