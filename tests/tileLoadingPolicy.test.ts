import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TILE_BITMAP_IMAGE_ORIENTATION,
  resolveFrontHemisphereTileBudget,
  resolveHighWarmupTileBudget,
  resolveLowTileLevel,
  shouldBootstrapSingleTile,
} from '../src/viewer/tileLoadingPolicy.ts';

test('tile bitmap decode orientation stays on flipY to match panorama chain', () => {
  assert.equal(TILE_BITMAP_IMAGE_ORIENTATION, 'flipY');
});

test('manifest lowLevelZ can force tiled low layer instead of legacy highest-below-highest selection', () => {
  const manifest = {
    type: 'equirect-tiles' as const,
    tileSize: 1024,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [
      { z: 0, cols: 3, rows: 2 },
      { z: 1, cols: 6, rows: 4 },
    ],
    lowLevelZ: 0,
  };

  const lowLevel = resolveLowTileLevel(manifest, manifest.levels[1]);
  assert.deepEqual(lowLevel, manifest.levels[0]);
  assert.equal(shouldBootstrapSingleTile(lowLevel), false);
});

test('legacy manifests still bootstrap 1x1 z0 when no lowLevelZ is provided', () => {
  const manifest = {
    type: 'equirect-tiles' as const,
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [
      { z: 0, cols: 1, rows: 1 },
      { z: 1, cols: 2, rows: 1 },
      { z: 2, cols: 4, rows: 2 },
      { z: 3, cols: 8, rows: 4 },
    ],
  };

  const lowLevel = resolveLowTileLevel(manifest, manifest.levels[3]);
  assert.deepEqual(lowLevel, manifest.levels[2]);
  assert.equal(shouldBootstrapSingleTile(manifest.levels[0]), true);
});

test('front hemisphere warmup budget for a 6x4 high level is 12 tiles', () => {
  const highLevel = { z: 1, cols: 6, rows: 4 };
  assert.equal(resolveFrontHemisphereTileBudget(highLevel), 12);
});

test('manifest warmup budget hint overrides derived hemisphere budget', () => {
  const manifest = {
    type: 'equirect-tiles' as const,
    tileSize: 1024,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [
      { z: 0, cols: 3, rows: 2 },
      { z: 1, cols: 6, rows: 4 },
    ],
    highWarmupTileBudget: 12,
  };

  assert.equal(resolveHighWarmupTileBudget(manifest, manifest.levels[1]), 12);
});
