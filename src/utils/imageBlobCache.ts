import { scheduleImageRequest, type RequestChannel } from './imageRequestScheduler.ts';

export type ImageBlobCacheOptions = {
  timeoutMs?: number;
  priority?: 'high' | 'low' | 'auto';
  channel?: RequestChannel;
};

type CacheEntry = {
  promise: Promise<Blob>;
  lastAccessAt: number;
};

const blobCache = new Map<string, CacheEntry>();

function touch(url: string): void {
  const entry = blobCache.get(url);
  if (!entry) return;
  entry.lastAccessAt = Date.now();
}

function createBlobFetchPromise(url: string, options: ImageBlobCacheOptions): Promise<Blob> {
  const timeoutMs = Math.max(1000, options.timeoutMs ?? 12000);
  const priority = options.priority ?? 'high';
  const channel = options.channel ?? 'tile';
  return scheduleImageRequest(channel, async () => {
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const init: RequestInit = {
        mode: 'cors',
        cache: 'default',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      };
      (init as any).priority = priority === 'auto' ? 'auto' : priority;
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(`image HTTP ${response.status}: ${url}`);
      }
      return await response.blob();
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  });
}

export async function readImageBlob(url: string, options: ImageBlobCacheOptions = {}): Promise<Blob> {
  const existing = blobCache.get(url);
  if (existing) {
    touch(url);
    return existing.promise;
  }

  const entry: CacheEntry = {
    promise: createBlobFetchPromise(url, options),
    lastAccessAt: Date.now(),
  };
  entry.promise = entry.promise.catch((error) => {
    const current = blobCache.get(url);
    if (current?.promise === entry.promise) {
      blobCache.delete(url);
    }
    throw error;
  });
  blobCache.set(url, entry);
  return entry.promise;
}

export async function primeImageBlob(url: string, options: ImageBlobCacheOptions = {}): Promise<void> {
  await readImageBlob(url, options);
}

export function clearImageBlobCache(): void {
  blobCache.clear();
}
