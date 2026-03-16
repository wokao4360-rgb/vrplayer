import test from 'node:test';
import assert from 'node:assert/strict';

import { clearImageBlobCache, readImageBlob } from '../src/utils/imageBlobCache.ts';

test('image blob cache dedupes concurrent fetches for the same url', async () => {
  clearImageBlobCache();
  const originalFetch = globalThis.fetch;
  let fetchCount = 0;
  globalThis.fetch = (async () => {
    fetchCount += 1;
    return new Response(new Blob(['cached-image']));
  }) as typeof fetch;

  try {
    const [first, second] = await Promise.all([
      readImageBlob('https://example.com/a.avif'),
      readImageBlob('https://example.com/a.avif'),
    ]);
    assert.equal(fetchCount, 1);
    assert.equal(await first.text(), 'cached-image');
    assert.equal(await second.text(), 'cached-image');
  } finally {
    globalThis.fetch = originalFetch;
    clearImageBlobCache();
  }
});

