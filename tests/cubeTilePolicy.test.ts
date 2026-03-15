import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCubeHighTileKeys, buildCubeLowFaceOrder, buildCubeVisibleHighFaces } from '../src/viewer/cubeTilePolicy.ts';

test('front-facing cubemap low faces follow front-left-right-up-down-back order', () => {
  assert.deepEqual(buildCubeLowFaceOrder({ yawDeg: 0, pitchDeg: 0 }), ['f', 'l', 'r', 'u', 'd', 'b']);
});

test('back-facing cubemap low faces follow current view orientation instead of fixed face names', () => {
  assert.deepEqual(buildCubeLowFaceOrder({ yawDeg: 180, pitchDeg: 0 }), ['b', 'r', 'l', 'u', 'd', 'f']);
});

test('front-facing cubemap high-res set only keeps the current front hemisphere', () => {
  assert.deepEqual(buildCubeVisibleHighFaces({ yawDeg: 0, pitchDeg: 0 }), ['f', 'l', 'r']);
});

test('back-facing cubemap high-res set follows the current front hemisphere', () => {
  assert.deepEqual(buildCubeVisibleHighFaces({ yawDeg: 180, pitchDeg: 0 }), ['b', 'r', 'l']);
});

test('right-facing cubemap low faces follow the scene initial yaw instead of fixed file names', () => {
  assert.deepEqual(buildCubeLowFaceOrder({ yawDeg: 90, pitchDeg: 0 }), ['r', 'f', 'b', 'u', 'd', 'l']);
});

test('right-facing cubemap high-res set tracks the rotated front hemisphere', () => {
  assert.deepEqual(buildCubeVisibleHighFaces({ yawDeg: 90, pitchDeg: 0 }), ['r', 'f', 'b']);
});

test('cubemap high-tile queue prioritizes the current front face before side faces', () => {
  const keys = buildCubeHighTileKeys(['f', 'r', 'l'], 2).map(({ face, col, row }) => `${face}:${col}_${row}`);
  assert.deepEqual(keys, [
    'f:1_1',
    'f:0_1',
    'f:1_0',
    'f:0_0',
    'r:1_1',
    'r:0_1',
    'r:1_0',
    'r:0_0',
    'l:1_1',
    'l:0_1',
    'l:1_0',
    'l:0_0',
  ]);
});

test('front hemisphere budget expands to exactly 12 high-res tiles', () => {
  const keys = buildCubeHighTileKeys(['f', 'l', 'r'], 2);
  assert.equal(keys.length, 12);
});
