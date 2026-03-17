import test from 'node:test';
import assert from 'node:assert/strict';

import { setAssetResolverConfig } from '../src/utils/assetResolver.ts';
import { clearTileManifestCache, fetchTileManifest } from '../src/viewer/tileManifest.ts';

test('tile manifest fetch shares the in-flight promise for the same request URL', async () => {
  const originalWindow = (globalThis as any).window;
  const originalLocation = (globalThis as any).location;
  const originalDocument = (globalThis as any).document;
  const originalFetch = globalThis.fetch;

  try {
    const fetchCalls: string[] = [];
    (globalThis as any).window = {
      location: {
        origin: 'https://wokao4360-rgb.github.io',
        href: 'https://wokao4360-rgb.github.io/vrplayer/?museum=wangding&scene=family_instruction&fresh=test-manifest-cache',
      },
    };
    (globalThis as any).location = (globalThis as any).window.location;
    (globalThis as any).document = {
      baseURI: 'https://wokao4360-rgb.github.io/vrplayer/',
    };

    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetchCalls.push(String(input));
      await new Promise((resolve) => setTimeout(resolve, 10));
      return new Response(
        JSON.stringify({
          type: 'cubemap-tiles',
          baseUrl: '/assets/panos/tiles/wangding/family_instruction',
          lowFaceSize: 512,
          highTileSize: 1024,
          highGrid: 2,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }) as typeof fetch;

    setAssetResolverConfig(undefined);
    clearTileManifestCache();

    const [first, second] = await Promise.all([
      fetchTileManifest('/assets/panos/tiles/wangding/family_instruction/manifest.json'),
      fetchTileManifest('/assets/panos/tiles/wangding/family_instruction/manifest.json'),
    ]);

    assert.equal(fetchCalls.length, 1);
    assert.equal(
      first.baseUrl,
      'https://wokao4360-rgb.github.io/vrplayer/assets/panos/tiles/wangding/family_instruction',
    );
    assert.equal(
      second.baseUrl,
      'https://wokao4360-rgb.github.io/vrplayer/assets/panos/tiles/wangding/family_instruction',
    );
  } finally {
    clearTileManifestCache();
    setAssetResolverConfig(undefined);
    globalThis.fetch = originalFetch;
    (globalThis as any).window = originalWindow;
    (globalThis as any).location = originalLocation;
    (globalThis as any).document = originalDocument;
  }
});
