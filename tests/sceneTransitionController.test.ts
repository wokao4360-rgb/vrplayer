import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const controllerSource = readFileSync(
  new URL('../src/app/sceneTransitionController.ts', import.meta.url),
  'utf8',
);

test('controller keeps optional interaction lock and exposes the classic transition session API', () => {
  assert.match(controllerSource, /onInteractionLock\?: \(locked: boolean\) => void;/);
  assert.match(controllerSource, /releaseMode\?: SceneTransitionReleaseMode;/);
  assert.match(controllerSource, /class SceneTransitionController/);
  assert.match(controllerSource, /class TransitionSession/);
  assert.match(controllerSource, /markLoadCommitted\(\): void/);
  assert.match(controllerSource, /waitForCompletion\(\): Promise<TransitionCompletion>/);
  assert.match(controllerSource, /computeSceneTransitionPlan\(/);
  assert.match(controllerSource, /buildSceneTransitionCameraView\(/);
});

