type Pending = {
  resolve: (bmp: ImageBitmap) => void;
  reject: (err: Error) => void;
  timer?: number;
};

let worker: Worker | null = null;
let seq = 0;
const pending = new Map<number, Pending>();

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
  opts: { timeoutMs?: number; priority?: 'low' | 'high' } = {}
): Promise<ImageBitmap | null> {
  const w = ensureWorker();
  if (!w || typeof createImageBitmap === 'undefined') return null;
  const id = ++seq;
  const timeoutMs = Math.max(1000, opts.timeoutMs ?? 12000);
  const priority = opts.priority ?? 'high';
  return new Promise<ImageBitmap>((resolve, reject) => {
    const entry: Pending = { resolve, reject };
    entry.timer = window.setTimeout(() => {
      pending.delete(id);
      reject(new Error('worker decode timeout'));
    }, timeoutMs + 500);
    pending.set(id, entry);
    w.postMessage({ id, url, timeoutMs, priority });
  });
}
