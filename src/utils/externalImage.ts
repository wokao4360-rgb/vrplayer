export type LoadExternalImageOptions = {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
};

// 全局并发控制
let activeCount = 0;
const queue: Array<() => void> = [];

function runWithLimit<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const execute = async () => {
      activeCount++;
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        activeCount--;
        if (queue.length > 0) {
          const next = queue.shift()!;
          next();
        }
      }
    };

    if (activeCount < 2) {
      execute();
    } else {
      queue.push(execute);
    }
  });
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  retries: number,
  retryDelayMs: number
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        cache: 'force-cache',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        console.warn(`外链图片加载重试 ${attempt + 1}/${retries + 1}: ${url}`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  throw new Error(`Failed to load image after ${retries + 1} attempts: ${url} - ${lastError?.name}: ${lastError?.message}`);
}

export async function loadExternalImageAsImageBitmap(
  url: string,
  opts: LoadExternalImageOptions = {}
): Promise<ImageBitmap> {
  const {
    timeoutMs = 12000,
    retries = 2,
    retryDelayMs = 400,
  } = opts;

  return runWithLimit(async () => {
    const response = await fetchWithTimeout(url, timeoutMs, retries, retryDelayMs);
    const blob = await response.blob();
    return await createImageBitmap(blob);
  });
}

export async function loadExternalImageAsHTMLImage(
  url: string,
  opts: LoadExternalImageOptions = {}
): Promise<HTMLImageElement> {
  const {
    timeoutMs = 10000,
    retries = 2,
    retryDelayMs = 350,
  } = opts;

  return runWithLimit(async () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.decoding = 'async';
      img.loading = 'lazy';

      let timeoutId: number | null = null;
      let currentAttempt = 0;

      const attemptLoad = () => {
        currentAttempt++;
        img.src = url;

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
          if (currentAttempt <= retries) {
            console.warn(`外链图片加载超时重试 ${currentAttempt}/${retries + 1}: ${url}`);
            attemptLoad();
          } else {
            reject(new Error(`Image load timeout after ${retries + 1} attempts: ${url}`));
          }
        }, timeoutMs);
      };

      img.onload = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        resolve(img);
      };

      img.onerror = (event) => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        if (currentAttempt <= retries) {
          console.warn(`外链图片加载失败重试 ${currentAttempt}/${retries + 1}: ${url}`, event);
          setTimeout(attemptLoad, retryDelayMs);
        } else {
          reject(new Error(`Image load failed after ${retries + 1} attempts: ${url}`));
        }
      };

      attemptLoad();
    });
  });
}
