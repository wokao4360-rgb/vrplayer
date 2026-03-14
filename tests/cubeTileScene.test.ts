import test from 'node:test';
import assert from 'node:assert/strict';

import { Vector3 } from '../src/vendor/three-core.ts';
import { CUBE_FACE_SEQUENCE, createCubeFaceRoot } from '../src/viewer/cubeTileScene.ts';

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
