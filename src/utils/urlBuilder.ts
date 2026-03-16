/**
 * URL 构建工具：统一处理 URL 构造，支持子目录部署。
 */

export function buildSameDirUrl(
  query: Record<string, string | number | boolean | null | undefined>,
): string {
  const url = new URL(window.location.href);
  const nextParams = new URLSearchParams(url.search);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      nextParams.delete(key);
      return;
    }
    nextParams.set(key, String(value));
  });

  url.search = nextParams.toString();
  return url.pathname + url.search + url.hash;
}

export function buildCleanUrl(): string {
  return window.location.pathname;
}

export function normalizePathname(): void {
  if (window.location.pathname.includes('//')) {
    const normalized = window.location.pathname.replace(/\/{2,}/g, '/');
    history.replaceState({}, '', normalized + window.location.search + window.location.hash);
  }
}
