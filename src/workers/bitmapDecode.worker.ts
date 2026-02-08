type DecodeRequest = {
  id: number;
  url: string;
  timeoutMs: number;
  priority: 'low' | 'high';
  imageOrientation?: 'from-image' | 'flipY' | 'none';
};

type DecodeResponse = {
  id: number;
  bitmap?: ImageBitmap;
  error?: string;
};

self.onmessage = async (event: MessageEvent<DecodeRequest>) => {
  const { id, url, timeoutMs, priority, imageOrientation = 'from-image' } = event.data;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const init: RequestInit = {
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer',
      signal: controller.signal,
    };
    (init as any).priority = priority === 'high' ? 'high' : 'low';
    const res = await fetch(url, init);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const bitmap = await (createImageBitmap as any)(blob, {
      imageOrientation,
      premultiplyAlpha: 'none',
    });
    const payload: DecodeResponse = { id, bitmap };
    (self as any).postMessage(payload, [bitmap]);
  } catch (err) {
    const payload: DecodeResponse = {
      id,
      error: err instanceof Error ? err.message : String(err),
    };
    (self as any).postMessage(payload);
  } finally {
    clearTimeout(timeoutId);
  }
};
