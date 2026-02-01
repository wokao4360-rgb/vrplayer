/**
 * 外链图片加载器
 * 优先使用原生 <img> 加载，fetch 作为可选兜底
 * 提供全局并发限制、超时重试、no-referrer 等功能
 */

/**
 * 将外链图片 URL 转换为同源代理 URL
 * 目前只代理以下域名：
 * - i.ibb.co
 * - s41.ax1x.com
 */
export function toProxiedImageUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname;
    if (host === 'i.ibb.co' || host === 's41.ax1x.com') {
      return `/_img?u=${encodeURIComponent(rawUrl)}`;
    }
  } catch {
    // 非法 URL，直接返回原 URL
  }
  // 其他域名或非法 URL，直接返回原 URL
  return rawUrl;
}

export type ExternalImageLoadOptions = {
  timeoutMs?: number; // 默认由调用侧传入（thumb 8000, pano 15000）
  retries?: number; // 默认 2
  retryBaseDelayMs?: number; // 默认 300
  referrerPolicy?: ReferrerPolicy; // 默认 'no-referrer'
  crossOrigin?: '' | 'anonymous' | 'use-credentials'; // 默认 'anonymous'
  priority?: 'high' | 'low' | 'auto'; // fetch/Image 优先级提示
  allowFetchFallback?: boolean; // 默认 false
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
 * 使用 fetch 加载图片（兜底方法）
 */
async function fetchWithRetry(
  url: string,
  timeoutMs: number,
  retries: number,
  retryBaseDelayMs: number,
  priority?: 'high' | 'low' | 'auto'
): Promise<ImageBitmap> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const init: RequestInit = {
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      };
      if (priority) {
        (init as any).priority = priority;
      }
      const response = await fetch(url, init);

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const imageBitmap = await createImageBitmap(blob);
      return imageBitmap;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error instanceof Error ? error : new Error(String(error));

      // 如果还有重试机会，进行指数退避
      if (attempt < retries) {
        const delayMs = retryBaseDelayMs * Math.pow(2, attempt);
        console.warn(`外链图片 fetch 重试 ${attempt + 1}/${retries + 1}: ${url}`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  // 所有重试都失败
  throw new ExternalImageLoadError(
    url,
    `fetch 加载失败（${retries + 1} 次尝试）: ${lastError?.message || '未知错误'}`,
    lastError || undefined
  );
}

/**
 * 使用原生 Image() 加载图片
 */
export async function loadExternalImageElement(
  url: string,
  opts: ExternalImageLoadOptions = {}
): Promise<HTMLImageElement> {
  const {
    timeoutMs = 15000,
    retries = 2,
    retryBaseDelayMs = 300,
    referrerPolicy = 'no-referrer',
    crossOrigin = 'anonymous',
    priority,
  } = opts;

  // 统一改写为代理 URL（如果是白名单域名）
  const finalUrl = toProxiedImageUrl(url);

  return runWithLimit(async () => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      let timeoutId: number | null = null;
      let currentAttempt = 0;
      let lastError: Error | null = null;
      let currentImg: HTMLImageElement | null = null;

      const attemptLoad = () => {
        currentAttempt++;

        // 创建新的 Image 实例（每次重试都新建，避免事件引用问题）
        const img = new Image();
        currentImg = img;

        // 设置属性
        img.decoding = 'async';
        (img as any).referrerPolicy = referrerPolicy;
        img.crossOrigin = crossOrigin;
        if (priority) {
          (img as any).fetchPriority = priority;
        }

        // 清理旧的超时定时器
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        // 设置超时
        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          lastError = new Error('加载超时');

          // 清理当前 img 的事件监听
          if (currentImg) {
            currentImg.onload = null;
            currentImg.onerror = null;
            currentImg = null;
          }

          if (currentAttempt <= retries) {
            const delayMs = retryBaseDelayMs * Math.pow(2, currentAttempt - 1);
            console.warn(`外链图片加载超时重试 ${currentAttempt}/${retries + 1}: ${finalUrl}`);
            setTimeout(attemptLoad, delayMs);
          } else {
            reject(new ExternalImageLoadError(
              url,
              `加载超时（${retries + 1} 次尝试）`,
              lastError
            ));
          }
        }, timeoutMs);

        // 成功回调
        img.onload = () => {
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }

          // 确保返回的是已加载完成的 img
          if (img.complete && img.naturalWidth > 0) {
            resolve(img);
          } else {
            // 如果图片未完全加载，等待一下再 resolve
            setTimeout(() => resolve(img), 0);
          }
        };

        // 失败回调
        img.onerror = (event) => {
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }

          lastError = new Error('图片加载失败');

          // 清理当前 img 的引用
          if (currentImg === img) {
            currentImg.onload = null;
            currentImg.onerror = null;
            currentImg = null;
          }

          if (currentAttempt <= retries) {
            const delayMs = retryBaseDelayMs * Math.pow(2, currentAttempt - 1);
            console.warn(`外链图片加载失败重试 ${currentAttempt}/${retries + 1}: ${finalUrl}`, event);
            setTimeout(attemptLoad, delayMs);
          } else {
            reject(new ExternalImageLoadError(
              url,
              `图片加载失败（${retries + 1} 次尝试）`,
              lastError
            ));
          }
        };

        // 开始加载（使用代理 URL）
        img.src = finalUrl;
      };

      attemptLoad();
    });
  });
}

/**
 * 加载外链图片为 ImageBitmap
 * 优先使用 Image() 原生加载，失败后可选使用 fetch 作为兜底
 */
export async function loadExternalImageBitmap(
  url: string,
  opts: ExternalImageLoadOptions = {}
): Promise<ImageBitmap> {
  const {
    timeoutMs = 15000,
    retries = 2,
    retryBaseDelayMs = 300,
    allowFetchFallback = false,
  } = opts;

  // 统一改写为代理 URL（如果是白名单域名）
  const finalUrl = toProxiedImageUrl(url);

  return runWithLimit(async () => {
    try {
      // 优先使用 Image() 原生加载（内部会再次使用代理 URL，但这里传入的是原始 URL 用于错误信息）
      const img = await loadExternalImageElement(finalUrl, opts);

      // 将已加载的 Image 转换为 ImageBitmap，并尊重 EXIF 方向
      const imageBitmap = await (createImageBitmap as any)(img, {
        imageOrientation: 'from-image',
        premultiplyAlpha: 'none',
      });
      return imageBitmap;
    } catch (error) {
      // Image() 加载失败
      if (allowFetchFallback) {
        // 如果允许 fetch 兜底，尝试 fetch（使用代理 URL）
        console.warn(`Image() 加载失败，尝试 fetch 兜底: ${finalUrl}`, error);
        try {
          return await fetchWithRetry(finalUrl, timeoutMs, retries, retryBaseDelayMs, opts.priority);
        } catch (fetchError) {
          // fetch 也失败了，抛出原始错误（Image() 的错误）
          if (error instanceof ExternalImageLoadError) {
            throw error;
          }
          throw new ExternalImageLoadError(
            url,
            `Image() 和 fetch 均失败: ${error instanceof Error ? error.message : String(error)}`,
            error instanceof Error ? error : undefined
          );
        }
      } else {
        // 不允许 fetch 兜底，直接抛出错误
        if (error instanceof ExternalImageLoadError) {
          throw error;
        }
        throw new ExternalImageLoadError(
          url,
          `Image() 加载失败: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : undefined
        );
      }
    }
  });
}
