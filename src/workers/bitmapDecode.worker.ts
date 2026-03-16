type DecodeRequest = {
  id: number;
  blob: Blob;
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
  const { id, blob, timeoutMs, priority, imageOrientation = 'from-image' } = event.data;
  const timeoutId = setTimeout(() => {
    const payload: DecodeResponse = {
      id,
      error: 'worker decode timeout',
    };
    (self as any).postMessage(payload);
  }, timeoutMs);
  try {
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
