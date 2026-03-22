import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');

test('same-museum path keeps viewer-driven routing but restores advanced transition controller', () => {
  assert.match(mainSource, /const viewerDrivenTransition = runtimePlan\.transitionDriver === 'viewer';/);
  assert.match(mainSource, /if \(viewerDrivenTransition\) \{\s*shellChrome\.completeTransition\(\);/);
  assert.match(mainSource, /else if \(runtimePlan\.shellStrategy === 'reuse-shell'\) \{\s*shellChrome\.startSceneTransition/);
  assert.match(mainSource, /const sceneTransitionController = this\.ensureSceneTransitionController\(\);/);
  assert.match(mainSource, /transitionSession = sceneTransitionController\.start\(\{/);
});

test('viewer-driven same-museum path commits through transition controller without pending-black fallback', () => {
  assert.match(
    mainSource,
    /const commitSceneLoad = \(\): void => \{\s*if \(sceneLoadCommitted \|\| !this\.panoViewer\) \{\s*return;\s*\}\s*sceneLoadCommitted = true;/,
  );
  assert.doesNotMatch(
    mainSource,
    /this\.panoViewer\.loadScene\(scene, \{\s*preserveView: true,\s*allowPendingBlack: true,\s*silentFallback: true,/,
  );
});

test('transition camera frame switches yaw conversion to target scene after commit using existing world/internal helpers', () => {
  assert.match(
    mainSource,
    /const yawScene = sceneLoadCommitted \|\| context\.useTargetScene \? scene : previousScene \?\? scene;/,
  );
  assert.match(mainSource, /const internalYaw = worldYawToInternalYaw\(yawScene, view\.yaw\);/);
});
