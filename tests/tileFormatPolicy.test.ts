import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTileUrl,
  getHighTilePlan,
  getLowTilePlan,
  normalizeTileManifest,
  selectInitialTileBackend,
} from '../src/viewer/tileFormatPolicy.ts';

test('normalizeTileManifest keeps legacy jpg manifests stable', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
  });

  assert.equal(manifest.tileFormat, 'jpg');
  assert.equal(manifest.lowFallbackFormat, undefined);
  assert.deepEqual(manifest.highFallbackFormats, undefined);
});

test('normalizeTileManifest fills avif fallback defaults', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'avif',
  });

  assert.equal(manifest.tileFormat, 'avif');
  assert.equal(manifest.lowFallbackFormat, 'jpg');
  assert.deepEqual(manifest.highFallbackFormats, ['ktx2', 'jpg']);
});

test('avif low tiles stay on bitmap chain and fall back to jpg only', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'avif',
  });

  assert.deepEqual(getLowTilePlan(manifest, { avifSupported: true }).bitmapFormats, ['avif', 'jpg']);
  assert.deepEqual(getLowTilePlan(manifest, { avifSupported: true }).meshFormats, []);
  assert.deepEqual(getLowTilePlan(manifest, { avifSupported: false }).bitmapFormats, ['jpg']);
});

test('avif high tiles prefer avif and then escalate to mesh fallback chain', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'avif',
  });

  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: true }).bitmapFormats, ['avif']);
  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: true }).meshFormats, ['ktx2', 'jpg']);
  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: false }).bitmapFormats, []);
  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: false }).meshFormats, ['ktx2', 'jpg']);
});

test('legacy ktx2 manifests still prefer mesh and keep jpg fallback', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'ktx2',
  });

  assert.equal(selectInitialTileBackend(manifest), 'mesh');
  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: true }).bitmapFormats, []);
  assert.deepEqual(getHighTilePlan(manifest, { avifSupported: true }).meshFormats, ['ktx2', 'jpg']);
});

test('buildTileUrl appends the requested extension without mutating base url', () => {
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'avif'), '/assets/panos/tiles/demo/z3/4_2.avif');
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'ktx2'), '/assets/panos/tiles/demo/z3/4_2.ktx2');
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'jpg'), '/assets/panos/tiles/demo/z3/4_2.jpg');
});
