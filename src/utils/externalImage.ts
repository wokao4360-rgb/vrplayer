
import { wait } from './debug'; // Assuming debug.ts has a simple wait function

interface LoadExternalImageOptions {
  timeout?: number;
  retries?: number;
  isPano?: boolean; // Added to differentiate pano timeouts
}

export class ImageLoadError extends Error {
  constructor(message: string, public url: string, public lastReason: any) {
    super(`Failed to load image ${url}: ${message}. Last reason: ${lastReason}`);
    this.name = 'ImageLoadError';
  }
}

// Global concurrency limit
const MAX_CONCURRENT_REQUESTS = 2;
let currentRequests = 0;
const requestQueue: (() => void)[] = [];

async function acquireLock(): Promise<void> {
  if (currentRequests < MAX_CONCURRENT_REQUESTS) {
    currentRequests++;
    return Promise.resolve();
  }
  return new Promise(resolve => {
    requestQueue.push(resolve);
  });
}

function releaseLock(): void {
  currentRequests--;
  if (requestQueue.length > 0) {
    const next = requestQueue.shift();
    if (next) {
      next();
    }
  }
}

// Exponential backoff
const RETRY_DELAY_MS = 300;

async function fetchWithRetryAndTimeout(
  url: string,
  options: RequestInit,
  retries: number,
  timeout: number
): Promise<Response> {
  let lastError: any;
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      clearTimeout(id);
      lastError = error;
      if (i < retries) {
        await wait(RETRY_DELAY_MS * Math.pow(2, i)); // Exponential backoff
      }
    }
  }
  throw lastError;
}

export async function loadExternalImageBitmap(url: string, opts?: LoadExternalImageOptions): Promise<ImageBitmap> {
  const options: LoadExternalImageOptions = {
    timeout: opts?.isPano ? 15000 : 8000,
    retries: 2,
    ...opts,
  };

  const fetchOptions: RequestInit = {
    referrerPolicy: 'no-referrer',
    cache: 'force-cache',
    mode: 'cors',
  };

  await acquireLock();
  try {
    const response = await fetchWithRetryAndTimeout(url, fetchOptions, options.retries!, options.timeout!);
    const blob = await response.blob();
    return await createImageBitmap(blob);
  } catch (error) {
    throw new ImageLoadError('Failed to create ImageBitmap', url, error);
  } finally {
    releaseLock();
  }
}

export async function loadExternalImageElement(url: string, opts?: LoadExternalImageOptions): Promise<HTMLImageElement> {
  const options: LoadExternalImageOptions = {
    timeout: opts?.isPano ? 15000 : 8000,
    retries: 2,
    ...opts,
  };

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.referrerPolicy = 'no-referrer';
    img.crossOrigin = 'anonymous'; // Required for CORS images
    img.loading = 'lazy'; // Add lazy loading here as well for consistency
    img.decoding = 'async'; // Add async decoding here

    const timeoutId = setTimeout(() => {
      // Clean up event listeners to prevent memory leaks
      img.onload = null;
      img.onerror = null;
      reject(new ImageLoadError('Image load timed out', url, 'Timeout'));
    }, options.timeout);

    img.onload = () => {
      clearTimeout(timeoutId);
      releaseLock(); // Release lock on success
      resolve(img);
    };

    img.onerror = (event) => {
      clearTimeout(timeoutId);
      releaseLock(); // Release lock on error
      reject(new ImageLoadError('Image load failed', url, event));
    };

    acquireLock().then(() => {
      img.src = url;
    });
  });
}
