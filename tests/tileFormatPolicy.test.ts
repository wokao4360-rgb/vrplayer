import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildTileUrl,
  getCubeAssetFace,
  getHighTilePlan,
  getLowTilePlan,
  normalizeTileManifest,
  resolveInitialTileFallbackVisibility,
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

test('normalizeTileManifest keeps cubemap AVIF manifests on the same fallback defaults', () => {
  const manifest = normalizeTileManifest({
    type: 'cubemap-tiles',
    baseUrl: '/assets/panos/cubemaps/demo',
    lowFaceSize: 512,
    highTileSize: 1024,
    highGrid: 2,
    tileFormat: 'avif',
  });

  assert.equal(manifest.type, 'cubemap-tiles');
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

test('avif initial canvas load keeps low tiles active even when fallback sphere is present', () => {
  const manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'avif',
  });

  assert.equal(resolveInitialTileFallbackVisibility(manifest, true), false);
  assert.equal(resolveInitialTileFallbackVisibility(manifest, false), false);
});

test('legacy jpg and ktx2 manifests still suppress low tile bootstrap when fallback is already visible', () => {
  const jpgManifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'jpg',
  });
  const ktx2Manifest = normalizeTileManifest({
    type: 'equirect-tiles',
    tileSize: 512,
    baseUrl: '/assets/panos/tiles/demo',
    levels: [{ z: 0, cols: 1, rows: 1 }],
    tileFormat: 'ktx2',
  });

  assert.equal(resolveInitialTileFallbackVisibility(jpgManifest, true), true);
  assert.equal(resolveInitialTileFallbackVisibility(ktx2Manifest, true), true);
});

test('buildTileUrl appends the requested extension without mutating base url', () => {
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'avif'), '/assets/panos/tiles/demo/z3/4_2.avif');
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'ktx2'), '/assets/panos/tiles/demo/z3/4_2.ktx2');
  assert.equal(buildTileUrl('/assets/panos/tiles/demo', 3, 4, 2, 'jpg'), '/assets/panos/tiles/demo/z3/4_2.jpg');
});

test('getCubeAssetFace defaults to world face and honors scene-level overrides', () => {
  assert.equal(getCubeAssetFace({}, 'f'), 'f');
  assert.equal(
    getCubeAssetFace(
      {
        assetFaceByWorldFace: {
          f: 'b',
          b: 'f',
        },
      },
      'f',
    ),
    'b',
  );
  assert.equal(
    getCubeAssetFace(
      {
        assetFaceByWorldFace: {
          f: 'b',
          b: 'f',
        },
      },
      'r',
    ),
    'r',
  );
});
