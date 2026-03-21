import test from 'node:test';
import assert from 'node:assert/strict';

import { computeSceneTransitionPlan } from '../src/app/sceneTransitionMath.ts';
import { buildSceneTransitionFrame, TURN_IN_RATIO } from '../src/app/sceneTransitionTimeline.ts';
import {
  createInitialTransitionProgressState,
  resolveRuntimeTransitionScene,
  shouldForwardCommittedSceneStatus,
  shouldCommitSceneLoad,
} from '../src/app/sceneTransitionRuntime.ts';

test('runtime scene keeps authored pano chain instead of replacing panoLow with preview shell', () => {
  const scene = {
    id: 'point_1',
    name: '红圈点1',
    panoLow: 'point-1-low.jpg',
    pano: 'point-1.jpg',
    panoTiles: { manifest: 'tiles/point-1/manifest.json' },
  } as any;

  const runtimeScene = resolveRuntimeTransitionScene(scene, 'blob:preview-shell');

  assert.equal(runtimeScene, scene);
  assert.equal(runtimeScene.panoLow, 'point-1-low.jpg');
});

test('prewarmed preview shell does not mark transition target as ready before actual low/high scene readiness', () => {
  const state = createInitialTransitionProgressState('blob:preview-shell');

  assert.equal(state.targetReady, false);
  assert.equal(state.lowReady, false);
  assert.equal(state.sharpReady, false);
  assert.equal(state.targetReadyAtTs, null);
  assert.equal(state.targetReadyProgress, 0);
});

test('runtime scene only falls back to preview shell when authored pano assets are missing', () => {
  const scene = {
    id: 'scene_without_pano',
    name: '空壳场景',
  } as any;

  const runtimeScene = resolveRuntimeTransitionScene(scene, 'blob:preview-shell');

  assert.notEqual(runtimeScene, scene);
  assert.equal(runtimeScene.panoLow, 'blob:preview-shell');
});

test('scene load commit waits until travel has established directionality instead of firing at travel start', () => {
  const plan = computeSceneTransitionPlan({
    currentWorldYaw: 0,
    targetWorldYaw: 30,
  });

  const turnInFrame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 30,
    plan,
    progress: TURN_IN_RATIO * 0.8,
    targetReady: true,
  });
  const earlyTravelFrame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 30,
    plan,
    progress: TURN_IN_RATIO + 0.04,
    targetReady: true,
  });
  const committedTravelFrame = buildSceneTransitionFrame({
    currentWorldYaw: 0,
    targetWorldYaw: 30,
    plan,
    progress: 0.66,
    targetReady: true,
  });

  assert.equal(turnInFrame.stage, 'turn-in');
  assert.equal(shouldCommitSceneLoad(turnInFrame), false);
  assert.equal(earlyTravelFrame.stage, 'travel');
  assert.equal(shouldCommitSceneLoad(earlyTravelFrame), false);
  assert.equal(committedTravelFrame.stage, 'travel');
  assert.equal(shouldCommitSceneLoad(committedTravelFrame), true);
});

test('transition session ignores low/high ready status before target scene load is committed', () => {
  assert.equal(shouldForwardCommittedSceneStatus(false, 'lowReady' as any), false);
  assert.equal(shouldForwardCommittedSceneStatus(false, 'highReady' as any), false);
  assert.equal(shouldForwardCommittedSceneStatus(false, 'degraded' as any), false);
  assert.equal(shouldForwardCommittedSceneStatus(false, 'error' as any), false);

  assert.equal(shouldForwardCommittedSceneStatus(true, 'lowReady' as any), true);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'highReady' as any), true);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'degraded' as any), true);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'error' as any), false);
});
