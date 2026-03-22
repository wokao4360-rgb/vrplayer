import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');

test('same-museum path branches to viewer-driven transition instead of shell transition', () => {
  assert.match(mainSource, /const viewerDrivenTransition = runtimePlan\.transitionDriver === 'viewer';/);
  assert.match(mainSource, /if \(viewerDrivenTransition\) \{\s*shellChrome\.completeTransition\(\);/);
  assert.match(mainSource, /else if \(runtimePlan\.shellStrategy === 'reuse-shell'\) \{\s*shellChrome\.startSceneTransition/);
});

test('viewer-driven same-museum path commits with pending-black and silent fallback', () => {
  assert.match(
    mainSource,
    /this\.panoViewer\.loadScene\(scene, \{\s*preserveView: true,\s*allowPendingBlack: true,\s*silentFallback: true,/,
  );
});

test('viewer-driven same-museum path cancels scripted motion on user interaction', () => {
  assert.match(mainSource, /if \(this\.panoViewer\.isInteracting\(\)\) \{\s*commitViewerScene\(\);\s*this\.cancelSceneMotion\(\);/);
});
