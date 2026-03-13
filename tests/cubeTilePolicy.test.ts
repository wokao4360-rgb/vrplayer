import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCubeHighTileKeys,
  buildCubeLowFaceOrder,
  buildCubeVisibleHighFaces,
} from '../src/viewer/cubeTilePolicy.ts';

test('cubemap low faces prioritize the current viewing hemisphere first', () => {
  const faces = buildCubeLowFaceOrder({ yawDeg: 0, pitchDeg: 0 });

  assert.deepEqual(faces.slice(0, 3), ['f', 'r', 'l']);
  assert.equal(new Set(faces).size, 6);
});

test('cubemap high warmup only seeds 12 tiles from the front hemisphere', () => {
  const faces = buildCubeVisibleHighFaces({ yawDeg: 18, pitchDeg: 12 });
  const keys = buildCubeHighTileKeys(faces, 2);

  assert.deepEqual(faces, ['f', 'r', 'u']);
  assert.equal(keys.length, 12);
  assert.equal(new Set(keys.map((item) => item.face)).size, 3);
});

test('cubemap visible high faces stay unchanged while the camera is stationary', () => {
  const first = buildCubeVisibleHighFaces({ yawDeg: 0, pitchDeg: 0 });
  const second = buildCubeVisibleHighFaces({ yawDeg: 0, pitchDeg: 0 });

  assert.deepEqual(second, first);
});

test('cubemap visible high faces only expand after the camera rotates into a new hemisphere', () => {
  const initial = buildCubeVisibleHighFaces({ yawDeg: 0, pitchDeg: 0 });
  const rotated = buildCubeVisibleHighFaces({ yawDeg: 92, pitchDeg: 0 });

  assert.notDeepEqual(rotated, initial);
  assert.deepEqual(rotated, ['r', 'b', 'u']);
});
