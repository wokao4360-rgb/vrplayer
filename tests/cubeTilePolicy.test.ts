import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCubeHighTileKeys, buildCubeVisibleHighFaces } from '../src/viewer/cubeTilePolicy.ts';

test('front-facing cubemap keeps all six faces in the high-res set', () => {
  assert.deepEqual(buildCubeVisibleHighFaces({ yawDeg: 0, pitchDeg: 0 }), ['f', 'r', 'l', 'u', 'd', 'b']);
});

test('back-facing cubemap keeps all six faces in the high-res set', () => {
  assert.deepEqual(buildCubeVisibleHighFaces({ yawDeg: 180, pitchDeg: 0 }), ['b', 'r', 'l', 'u', 'd', 'f']);
});

test('cubemap high-tile queue interleaves faces instead of completing one face first', () => {
  const keys = buildCubeHighTileKeys(['f', 'r', 'l'], 2).map(({ face, col, row }) => `${face}:${col}_${row}`);
  assert.deepEqual(keys, [
    'f:0_0',
    'r:0_0',
    'l:0_0',
    'f:1_0',
    'r:1_0',
    'l:1_0',
    'f:0_1',
    'r:0_1',
    'l:0_1',
    'f:1_1',
    'r:1_1',
    'l:1_1',
  ]);
});

test('full cubemap budget expands to exactly 24 high-res tiles', () => {
  const keys = buildCubeHighTileKeys(['f', 'r', 'b', 'l', 'u', 'd'], 2);
  assert.equal(keys.length, 24);
});
