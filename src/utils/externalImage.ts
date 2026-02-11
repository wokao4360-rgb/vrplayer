/**
 * 外链图片加载器
 * 优先使用原生 <img> 加载，fetch 作为可选兜底
 * 提供分通道并发调度、超时重试、no-referrer 等功能
 */
import { scheduleImageRequest, type RequestChannel } from './imageRequestScheduler';

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
  imageOrientation?: 'from-image' | 'flipY' | 'none'; // 默认 from-image
  channel?: RequestChannel; // 请求通道（tile / pano / preload / ui）
};

/**
 * 外链图片加载错误
 */
export class ExternalImageLoadError extends Error {
  constructor(public url: string, message: string, public originalError?: Error) {
    super(message);
    this.name = 'ExternalImageLoadError';
  }
}

function loadExternalImageElementInternal(
  url: string,
  opts: ExternalImageLoadOptions = {},
): Promise<HTMLImageElement> {
  const {
    timeoutMs = 15000,
    retries = 2,
    retryBaseDelayMs = 300,
    referrerPolicy = 'no-referrer',
    crossOrigin = 'anonymous',
    priority,
  } = opts;

  const finalUrl = toProxiedImageUrl(url);
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let timeoutId: number | null = null;
    let currentAttempt = 0;
    let lastError: Error | null = null;
    let currentImg: HTMLImageElement | null = null;

    const attemptLoad = () => {
      currentAttempt++;

      const img = new Image();
      currentImg = img;
      img.decoding = 'async';
      (img as any).referrerPolicy = referrerPolicy;
      img.crossOrigin = crossOrigin;
      if (priority) {
        (img as any).fetchPriority = priority;
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      timeoutId = window.setTimeout(() => {
        timeoutId = null;
        lastError = new Error('加载超时');
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
          reject(new ExternalImageLoadError(url, `加载超时（${retries + 1} 次尝试）`, lastError));
        }
      }, timeoutMs);

      img.onload = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (img.complete && img.naturalWidth > 0) {
          resolve(img);
        } else {
          setTimeout(() => resolve(img), 0);
        }
      };

      img.onerror = (event) => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastError = new Error('图片加载失败');

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
          reject(new ExternalImageLoadError(url, `图片加载失败（${retries + 1} 次尝试）`, lastError));
        }
      };

      img.src = finalUrl;
    };

    attemptLoad();
  });
}

/**
 * 使用原生 Image() 加载图片
 */
export async function loadExternalImageElement(
  url: string,
  opts: ExternalImageLoadOptions = {},
): Promise<HTMLImageElement> {
  const channel = opts.channel ?? 'ui';
  return scheduleImageRequest(channel, () => loadExternalImageElementInternal(url, opts));
}

/**
 * 使用 fetch 加载图片（兜底方法）
 */
async function fetchWithRetry(
  url: string,
  timeoutMs: number,
  retries: number,
  retryBaseDelayMs: number,
  priority?: 'high' | 'low' | 'auto',
  imageOrientation: 'from-image' | 'flipY' | 'none' = 'from-image',
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
      const imageBitmap = await (createImageBitmap as any)(blob, {
        imageOrientation,
        premultiplyAlpha: 'none',
      });
      return imageBitmap;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retries) {
        const delayMs = retryBaseDelayMs * Math.pow(2, attempt);
        console.warn(`外链图片 fetch 重试 ${attempt + 1}/${retries + 1}: ${url}`, lastError.message);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new ExternalImageLoadError(
    url,
    `fetch 加载失败（${retries + 1} 次尝试）: ${lastError?.message || '未知错误'}`,
    lastError || undefined,
  );
}

/**
 * 加载外链图片为 ImageBitmap
 * 优先使用 Image() 原生加载，失败后可选使用 fetch 作为兜底
 */
export async function loadExternalImageBitmap(
  url: string,
  opts: ExternalImageLoadOptions = {},
): Promise<ImageBitmap> {
  const {
    timeoutMs = 15000,
    retries = 2,
    retryBaseDelayMs = 300,
    allowFetchFallback = false,
    imageOrientation = 'from-image',
  } = opts;

  const channel = opts.channel ?? 'ui';
  return scheduleImageRequest(channel, async () => {
    try {
      const img = await loadExternalImageElementInternal(url, opts);
      return await (createImageBitmap as any)(img, {
        imageOrientation,
        premultiplyAlpha: 'none',
      });
    } catch (error) {
      if (!allowFetchFallback) {
        if (error instanceof ExternalImageLoadError) {
          throw error;
        }
        throw new ExternalImageLoadError(
          url,
          `Image() 加载失败: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : undefined,
        );
      }

      const finalUrl = toProxiedImageUrl(url);
      console.warn(`Image() 加载失败，尝试 fetch 兜底: ${finalUrl}`, error);
      try {
        return await fetchWithRetry(
          finalUrl,
          timeoutMs,
          retries,
          retryBaseDelayMs,
          opts.priority,
          imageOrientation,
        );
      } catch {
        if (error instanceof ExternalImageLoadError) {
          throw error;
        }
        throw new ExternalImageLoadError(
          url,
          `Image() 和 fetch 均失败: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : undefined,
        );
      }
    }
  });
}
