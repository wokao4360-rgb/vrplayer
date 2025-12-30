/**
 * 外链图片加载器
 * 提供全局并发限制、超时重试、no-referrer 等功能
 */

export type LoadExternalImageOptions = {
  timeoutMs?: number;
  retries?: number;
  imageType?: 'thumb' | 'pano';
};

/**
 * 外链图片加载错误
 */
export class ExternalImageLoadError extends Error {
  constructor(
    public url: string,
    message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ExternalImageLoadError';
  }
}

// 全局并发限制：最多同时 2 个外链图片请求
let activeCount = 0;
const queue: Array<() => void> = [];

/**
 * 使用并发限制执行异步任务
 */
function runWithConcurrencyLimit<T>(fn: () => Promise<T>): Promise<T> {
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
        // 处理队列中的下一个任务
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

/**
 * 带超时和重试的 fetch
 * 使用指数退避：300ms、600ms
 */
async function fetchWithRetry(
  url: string,
  timeoutMs: number,
  retries: number
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        cache: 'force-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error instanceof Error ? error : new Error(String(error));

      // 如果还有重试机会，进行指数退避
      if (attempt < retries) {
        const delayMs = 300 * Math.pow(2, attempt); // 300ms, 600ms
        console.warn(`外链图片加载重试 ${attempt + 1}/${retries + 1}: ${url}`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  // 所有重试都失败
  throw new ExternalImageLoadError(
    url,
    `加载失败（${retries + 1} 次尝试）: ${lastError?.message || '未知错误'}`,
    lastError || undefined
  );
}

/**
 * 加载外链图片为 ImageBitmap（优先方法）
 * 
 * @param url 图片 URL
 * @param options 加载选项
 * @returns Promise<ImageBitmap>
 */
export async function loadExternalImageBitmap(
  url: string,
  options: LoadExternalImageOptions = {}
): Promise<ImageBitmap> {
  const {
    timeoutMs,
    retries = 2,
    imageType = 'pano',
  } = options;

  // 根据图片类型设置默认超时时间
  const defaultTimeout = imageType === 'thumb' ? 8000 : 15000;
  const finalTimeout = timeoutMs ?? defaultTimeout;

  return runWithConcurrencyLimit(async () => {
    try {
      const response = await fetchWithRetry(url, finalTimeout, retries);
      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);
      return imageBitmap;
    } catch (error) {
      if (error instanceof ExternalImageLoadError) {
        throw error;
      }
      throw new ExternalImageLoadError(
        url,
        `createImageBitmap 失败: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error : undefined
      );
    }
  });
}

/**
 * 加载外链图片为 HTMLImageElement（兜底方法）
 * 
 * @param url 图片 URL
 * @param options 加载选项
 * @returns Promise<HTMLImageElement>
 */
export async function loadExternalImageElement(
  url: string,
  options: LoadExternalImageOptions = {}
): Promise<HTMLImageElement> {
  const {
    timeoutMs,
    retries = 2,
    imageType = 'pano',
  } = options;

  // 根据图片类型设置默认超时时间
  const defaultTimeout = imageType === 'thumb' ? 8000 : 15000;
  const finalTimeout = timeoutMs ?? defaultTimeout;

  return runWithConcurrencyLimit(async () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.crossOrigin = 'anonymous';
      // 注意：loading 和 decoding 属性在动态创建的 img 上可能不支持，这里不加

      let timeoutId: number | null = null;
      let currentAttempt = 0;
      let lastError: Error | null = null;

      const attemptLoad = () => {
        currentAttempt++;
        img.src = url;

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          lastError = new Error('加载超时');
          if (currentAttempt <= retries) {
            const delayMs = 300 * Math.pow(2, currentAttempt - 1); // 300ms, 600ms
            console.warn(`外链图片加载超时重试 ${currentAttempt}/${retries + 1}: ${url}`);
            setTimeout(attemptLoad, delayMs);
          } else {
            reject(new ExternalImageLoadError(
              url,
              `加载超时（${retries + 1} 次尝试）`,
              lastError
            ));
          }
        }, finalTimeout);
      };

      img.onload = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        resolve(img);
      };

      img.onerror = (event) => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        lastError = new Error('图片加载失败');
        if (currentAttempt <= retries) {
          const delayMs = 300 * Math.pow(2, currentAttempt - 1); // 300ms, 600ms
          console.warn(`外链图片加载失败重试 ${currentAttempt}/${retries + 1}: ${url}`, event);
          setTimeout(attemptLoad, delayMs);
        } else {
          reject(new ExternalImageLoadError(
            url,
            `图片加载失败（${retries + 1} 次尝试）`,
            lastError
          ));
        }
      };

      attemptLoad();
    });
  });
}
