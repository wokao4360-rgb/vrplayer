import test from 'node:test';
import assert from 'node:assert/strict';

import { appendFreshParamToTileManifestUrl, createTileManifestRequestInit } from '../src/viewer/tileManifestFetchPolicy.ts';

test('tile manifest requests bypass caches so scene-level mapping changes take effect immediately', () => {
  const init = createTileManifestRequestInit();
  assert.equal(init.cache, 'no-store');
  assert.equal((init as any).priority, 'high');
});

test('tile manifest requests inherit page fresh query to bypass stale service-worker cache entries', () => {
  assert.equal(
    appendFreshParamToTileManifestUrl(
      'https://wokao4360-rgb.github.io/vrplayer/assets/panos/tiles/linzexu/south_gate/manifest.json',
      'https://wokao4360-rgb.github.io/vrplayer/?museum=linzexu&scene=south_gate&fresh=20260315-1708',
    ),
    'https://wokao4360-rgb.github.io/vrplayer/assets/panos/tiles/linzexu/south_gate/manifest.json?fresh=20260315-1708',
  );
  assert.equal(
    appendFreshParamToTileManifestUrl(
      'https://example.com/assets/panos/tiles/demo/manifest.json?foo=1',
      'https://example.com/app/?fresh=20260315-1708',
    ),
    'https://example.com/assets/panos/tiles/demo/manifest.json?foo=1&fresh=20260315-1708',
  );
});
