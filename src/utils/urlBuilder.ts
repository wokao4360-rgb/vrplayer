/**
 * URL 构建工具：统一处理 URL 构造，支持子目录部署（如 CloudBase /vrplayer/）
 */

/**
 * 构造同源、同目录的目标地址（相对路径）
 * 保留当前 pathname，只更新 search 参数
 * 适配 CloudBase 子目录部署：/vrplayer/ 或本地 /
 */
export function buildSameDirUrl(query: Record<string, string | number | boolean | null | undefined>): string {
  const url = new URL(window.location.href);

  // 清空所有现有参数
  url.search = '';

  // 设置新参数（跳过空值）
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v));
    }
  });

  // 返回相对地址：pathname + search + hash
  // 例如：/vrplayer/?museum=wangding&scene=gate
  return url.pathname + url.search + url.hash;
}

/**
 * 构造不带任何参数的当前路径
 */
export function buildCleanUrl(): string {
  return window.location.pathname;
}

/**
 * Normalize 双斜杠路径
 * 把 //vrplayer// 这种规范化为 /vrplayer/
 */
export function normalizePathname(): void {
  if (window.location.pathname.includes('//')) {
    const normalized = window.location.pathname.replace(/\/{2,}/g, '/');
    history.replaceState({}, '', normalized + window.location.search + window.location.hash);
  }
}






