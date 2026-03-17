import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AssetType,
  resolveAssetUrl,
  setAssetResolverConfig,
  waitForAssetResolverReady,
} from '../src/utils/assetResolver.ts';

class MemoryStorage {
  private readonly store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

test('asset resolver reuses cached CDN winner without firing probe requests', async () => {
  const originalWindow = (globalThis as any).window;
  const originalLocation = (globalThis as any).location;
  const originalDocument = (globalThis as any).document;
  const originalLocalStorage = (globalThis as any).localStorage;
  const originalFetch = globalThis.fetch;

  try {
    const storage = new MemoryStorage();
    const cachedBaseUrl = 'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs';
    storage.setItem(
      'vrplayer.assetCdn.lastSuccess',
      JSON.stringify({
        baseUrl: cachedBaseUrl,
        updatedAt: Date.now(),
        expiresAt: Date.now() + 60_000,
      }),
    );

    const fetchCalls: string[] = [];
    (globalThis as any).window = {
      location: {
        origin: 'https://wokao4360-rgb.github.io',
        href: 'https://wokao4360-rgb.github.io/vrplayer/?museum=wangding&fresh=test-cached-probe',
      },
      localStorage: storage,
    };
    (globalThis as any).location = (globalThis as any).window.location;
    (globalThis as any).document = {
      baseURI: 'https://wokao4360-rgb.github.io/vrplayer/',
    };
    (globalThis as any).localStorage = storage;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetchCalls.push(String(input));
      return new Response('{}', { status: 200 });
    }) as typeof fetch;

    setAssetResolverConfig({
      enabled: true,
      baseUrls: [
        cachedBaseUrl,
        'https://github.cnxiaobai.com/https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
      ],
      includePrefixes: ['/assets/panos/'],
      probePath: '/config.json',
      probeTimeoutMs: 1000,
    });

    await waitForAssetResolverReady();

    assert.equal(fetchCalls.length, 0);
    assert.equal(
      resolveAssetUrl('/assets/panos/tiles/wangding/culture_achievement/manifest.json', AssetType.PANO),
      `${cachedBaseUrl}/assets/panos/tiles/wangding/culture_achievement/manifest.json`,
    );
  } finally {
    setAssetResolverConfig(undefined);
    globalThis.fetch = originalFetch;
    (globalThis as any).window = originalWindow;
    (globalThis as any).location = originalLocation;
    (globalThis as any).document = originalDocument;
    (globalThis as any).localStorage = originalLocalStorage;
  }
});
