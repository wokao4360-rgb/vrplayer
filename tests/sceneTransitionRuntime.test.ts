import test from 'node:test';
import assert from 'node:assert/strict';

import {
  LOAD_COMMIT_TRAVEL_PROGRESS,
  createInitialTransitionProgressState,
  resolveRuntimeTransitionScene,
  shouldCommitSceneLoad,
  shouldForwardCommittedSceneStatus,
} from '../src/app/sceneTransitionRuntime.ts';

test('runtime scene falls back to preview panoLow when the scene has no own pano assets', () => {
  const scene = resolveRuntimeTransitionScene(
    {
      id: 'scene-a',
      name: 'Scene A',
      initialView: { yaw: 0, pitch: 0, fov: 75 },
      hotspots: [],
      panoLow: '',
      pano: '',
      panoTiles: undefined,
    } as any,
    'preview.jpg',
  );

  assert.equal(scene.panoLow, 'preview.jpg');
});

test('runtime scene keeps original assets when pano data already exists', () => {
  const scene = resolveRuntimeTransitionScene(
    {
      id: 'scene-b',
      name: 'Scene B',
      initialView: { yaw: 0, pitch: 0, fov: 75 },
      hotspots: [],
      panoLow: 'low.jpg',
      pano: 'high.jpg',
      panoTiles: undefined,
    } as any,
    'preview.jpg',
  );

  assert.equal(scene.panoLow, 'low.jpg');
});

test('runtime scene injects preview panoLow for tile scenes that lack their own low fallback', () => {
  const scene = resolveRuntimeTransitionScene(
    {
      id: 'scene-c',
      name: 'Scene C',
      initialView: { yaw: 0, pitch: 0, fov: 75 },
      hotspots: [],
      panoLow: '',
      pano: '',
      panoTiles: { manifest: 'tiles/scene-c.json' },
    } as any,
    'preview.jpg',
  );

  assert.equal(scene.panoLow, 'preview.jpg');
});

test('load commitment happens in travel after the configured threshold or in settle', () => {
  assert.equal(LOAD_COMMIT_TRAVEL_PROGRESS, 0.72);
  assert.equal(
    shouldCommitSceneLoad({ stage: 'travel', stageProgress: 0.65 }),
    false,
  );
  assert.equal(
    shouldCommitSceneLoad({ stage: 'travel', stageProgress: 0.72 }),
    true,
  );
  assert.equal(
    shouldCommitSceneLoad({ stage: 'settle', stageProgress: 0.1 }),
    true,
  );
});

test('committed statuses only forward after scene load is committed', () => {
  assert.equal(shouldForwardCommittedSceneStatus(false, 'lowReady'), false);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'lowReady'), true);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'highReady'), true);
  assert.equal(shouldForwardCommittedSceneStatus(true, 'degraded'), true);
});

test('initial transition progress state starts clean', () => {
  const state = createInitialTransitionProgressState('preview.jpg');

  assert.equal(state.targetReady, false);
  assert.equal(state.currentProgress, 0);
  assert.equal(state.releaseAtTs, null);
});
