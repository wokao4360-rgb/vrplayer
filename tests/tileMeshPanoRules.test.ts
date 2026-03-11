import test from 'node:test';
import assert from 'node:assert/strict';

import { getTileMeshRenderConfig, normalizeTileUv } from '../src/viewer/tileMeshPanoRules.ts';

test('normalizeTileUv keeps tile edges on exact 0..1 bounds', () => {
  const min = normalizeTileUv(0.25, 0.6, {
    minU: 0.25,
    maxU: 0.75,
    minV: 0.1,
    maxV: 0.6,
  });
  const max = normalizeTileUv(0.75, 0.1, {
    minU: 0.25,
    maxU: 0.75,
    minV: 0.1,
    maxV: 0.6,
  });

  assert.equal(min.u, 0);
  assert.equal(min.v, 0);
  assert.equal(max.u, 1);
  assert.equal(max.v, 1);
});

test('getTileMeshRenderConfig keeps tile meshes in depth pipeline', () => {
  const low = getTileMeshRenderConfig('low');
  const high = getTileMeshRenderConfig('high');

  assert.equal(low.depthTest, true);
  assert.equal(low.depthWrite, true);
  assert.equal(high.depthTest, true);
  assert.equal(high.depthWrite, true);
  assert.ok(high.renderOrder > low.renderOrder);
});
