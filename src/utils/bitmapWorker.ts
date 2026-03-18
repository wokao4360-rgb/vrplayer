import { readImageBlob, type ImageBlobCacheOptions } from './imageBlobCache.ts';

type Pending = {
  resolve: (bmp: ImageBitmap) => void;
  reject: (err: Error) => void;
  timer?: number;
};

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, Pending>();
type DecodedEntry = {
  promise: Promise<ImageBitmap>;
  lastAccessAt: number;
};
const decodedBitmapCache = new Map<string, DecodedEntry>();
const MAX_DECODED_BITMAPS = 24;

function touchDecoded(url: string): void {
  const entry = decodedBitmapCache.get(url);
  if (!entry) return;
  entry.lastAccessAt = Date.now();
}

function closeBitmapSafely(bitmap: ImageBitmap): void {
  try {
    bitmap.close();
  } catch {
    // ignore bitmap close failures
  }
}

function pruneDecodedBitmapCache(): void {
  if (decodedBitmapCache.size <= MAX_DECODED_BITMAPS) {
    return;
  }
  const staleEntries = [...decodedBitmapCache.entries()]
    .sort((a, b) => a[1].lastAccessAt - b[1].lastAccessAt)
    .slice(0, decodedBitmapCache.size - MAX_DECODED_BITMAPS);
  for (const [url, entry] of staleEntries) {
    decodedBitmapCache.delete(url);
    void entry.promise.then((bitmap) => closeBitmapSafely(bitmap)).catch(() => {
      // ignore failed decode entries during eviction
    });
  }
}

function ensureWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null;
  if (worker) return worker;
  worker = new Worker(new URL('../workers/bitmapDecode.worker.ts', import.meta.url), {
    type: 'module',
  });
  worker.onmessage = (event: MessageEvent<{ id: number; bitmap?: ImageBitmap; error?: string }>) => {
    const { id, bitmap, error } = event.data || {};
    const entry = pending.get(id);
    if (!entry) return;
    pending.delete(id);
    if (entry.timer) window.clearTimeout(entry.timer);
    if (error) {
      entry.reject(new Error(error));
    } else if (bitmap) {
      entry.resolve(bitmap);
    } else {
      entry.reject(new Error('worker 返回空结果'));
    }
  };
  worker.onerror = () => {
    // worker 崩溃时，清空所有挂起
    pending.forEach((entry) => entry.reject(new Error('worker error')));
    pending.clear();
  };
  return worker;
}

export async function decodeImageBitmapInWorker(
  url: string,
  opts: {
    timeoutMs?: number;
    priority?: 'low' | 'high';
    imageOrientation?: 'from-image' | 'flipY' | 'none';
    channel?: ImageBlobCacheOptions['channel'];
  } = {}
): Promise<ImageBitmap | null> {
  const w = ensureWorker();
  if (!w || typeof createImageBitmap === 'undefined') return null;
  const cached = decodedBitmapCache.get(url);
  if (cached) {
    touchDecoded(url);
    return cached.promise;
  }
  const id = ++seq;
  const timeoutMs = Math.max(1000, opts.timeoutMs ?? 12000);
  const priority = opts.priority ?? 'high';
  const imageOrientation = opts.imageOrientation ?? 'from-image';
  const promise = (async () => {
    const blob = await readImageBlob(url, {
      timeoutMs,
      priority,
      channel: opts.channel ?? 'tile',
    });
    return await new Promise<ImageBitmap>((resolve, reject) => {
      const entry: Pending = { resolve, reject };
      entry.timer = window.setTimeout(() => {
        pending.delete(id);
        reject(new Error('worker decode timeout'));
      }, timeoutMs + 500);
      pending.set(id, entry);
      w.postMessage({ id, blob, timeoutMs, priority, imageOrientation });
    });
  })();
  const entry: DecodedEntry = {
    promise,
    lastAccessAt: Date.now(),
  };
  entry.promise = entry.promise.catch((error) => {
    const current = decodedBitmapCache.get(url);
    if (current?.promise === entry.promise) {
      decodedBitmapCache.delete(url);
    }
    throw error;
  });
  decodedBitmapCache.set(url, entry);
  pruneDecodedBitmapCache();
  return entry.promise;
}

export async function primeDecodedBitmap(
  url: string,
  opts: {
    timeoutMs?: number;
    priority?: 'low' | 'high';
    imageOrientation?: 'from-image' | 'flipY' | 'none';
    channel?: ImageBlobCacheOptions['channel'];
  } = {},
): Promise<void> {
  const bitmap = await decodeImageBitmapInWorker(url, opts);
  if (!bitmap) {
    throw new Error(`bitmap decode unavailable: ${url}`);
  }
}

export function clearDecodedBitmapCache(): void {
  for (const entry of decodedBitmapCache.values()) {
    void entry.promise.then((bitmap) => closeBitmapSafely(bitmap)).catch(() => {
      // ignore failed decode entries during cache clear
    });
  }
  decodedBitmapCache.clear();
}
