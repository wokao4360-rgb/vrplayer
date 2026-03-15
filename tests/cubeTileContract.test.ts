import test from 'node:test';
import assert from 'node:assert/strict';

import {
  assertCubemapBitmapDimensions,
  getCubemapBudget,
} from '../src/viewer/cubeTileContract.ts';

const manifest = {
  type: 'cubemap-tiles',
  baseUrl: '/assets/panos/tiles/linzexu/south_gate',
  lowFaceSize: 512,
  highTileSize: 1024,
  highGrid: 2,
  faces: ['f', 'r', 'b', 'l', 'u', 'd'],
} as const;

test('cubemap budget stays fixed at 6 low faces and 24 high tiles', () => {
  assert.deepEqual(getCubemapBudget(manifest), {
    lowFaceCount: 6,
    lowFaceSize: 512,
    highTileCount: 24,
    highTileSize: 1024,
  });
});

test('cubemap bitmap dimension guard accepts the required low/high sizes', () => {
  assert.doesNotThrow(() => {
    assertCubemapBitmapDimensions(manifest, 'low', 512, 512, 'low/f.avif');
    assertCubemapBitmapDimensions(manifest, 'high', 1024, 1024, 'high/f/0_0.avif');
  });
});

test('cubemap bitmap dimension guard rejects wrong sizes', () => {
  assert.throws(
    () => assertCubemapBitmapDimensions(manifest, 'high', 512, 512, 'high/f/0_0.avif'),
    /expected 1024x1024, got 512x512/,
  );
});
