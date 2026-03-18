import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveMuseumShellWarmExecutionLayers } from '../src/app/museumShellPreloadExecution.ts';
import { shouldPrimeDecodedTileRole } from '../src/app/museumShellTileWarmPolicy.ts';

test('museum shell warm executes cover, preview, and hero layers during museum-entry', () => {
  assert.deepEqual(resolveMuseumShellWarmExecutionLayers('museum-entry'), ['L0', 'L1', 'L2']);
});

test('museum shell warm executes preview and hero layers during scene-transition', () => {
  assert.deepEqual(resolveMuseumShellWarmExecutionLayers('scene-transition'), ['L0', 'L1', 'L2']);
});

test('museum shell cover warm decodes low faces and hero tiles before CTA handoff', () => {
  assert.equal(shouldPrimeDecodedTileRole('low-face'), true);
  assert.equal(shouldPrimeDecodedTileRole('hero-high-tile'), true);
  assert.equal(shouldPrimeDecodedTileRole('remaining-high-tile'), false);
});
