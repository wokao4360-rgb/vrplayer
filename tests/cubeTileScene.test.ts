import test from 'node:test';
import assert from 'node:assert/strict';

import { Vector3 } from '../src/vendor/three-core.ts';
import { CUBE_FACE_SEQUENCE, createCubeFaceRoot, getCubeTileAtlasDrawRect } from '../src/viewer/cubeTileScene.ts';

test('cubemap face roots keep every face normal pointing toward the camera origin', () => {
  for (const face of CUBE_FACE_SEQUENCE) {
    const root = createCubeFaceRoot(face, 500);
    const inwardNormal = new Vector3(0, 0, 1).applyEuler(root.rotation).normalize();
    const outwardPosition = root.position.clone().normalize();

    assert.ok(
      inwardNormal.dot(outwardPosition) < -0.99,
      `face ${face} is not facing inward`,
    );
  }
});

test('cubemap atlas rects add 1px bleed on internal seams without overflowing the face canvas', () => {
  const faceSize = 2048;
  const grid = 2;

  const topLeft = getCubeTileAtlasDrawRect(faceSize, grid, 0, 0);
  const topRight = getCubeTileAtlasDrawRect(faceSize, grid, 1, 0);
  const bottomLeft = getCubeTileAtlasDrawRect(faceSize, grid, 0, 1);
  const bottomRight = getCubeTileAtlasDrawRect(faceSize, grid, 1, 1);

  assert.deepEqual(topLeft, { x: 0, y: 0, width: 1025, height: 1025 });
  assert.deepEqual(topRight, { x: 1023, y: 0, width: 1025, height: 1025 });
  assert.deepEqual(bottomLeft, { x: 0, y: 1023, width: 1025, height: 1025 });
  assert.deepEqual(bottomRight, { x: 1023, y: 1023, width: 1025, height: 1025 });

  for (const rect of [topLeft, topRight, bottomLeft, bottomRight]) {
    assert.ok(rect.x >= 0 && rect.y >= 0, 'rect should stay within the face canvas');
    assert.ok(rect.x + rect.width <= faceSize, 'rect should not overflow face width');
    assert.ok(rect.y + rect.height <= faceSize, 'rect should not overflow face height');
  }
});
