/**
 * 资源 URL 解析器
 * 统一处理资源 URL，支持按配置将指定资源路径改写到 CDN。
 */

export enum AssetType {
  THUMB = 'thumb',
  PANO_LOW = 'panoLow',
  PANO = 'pano',
  VIDEO = 'video',
  COVER = 'cover',
  MAP = 'map',
  DOLLHOUSE = 'dollhouse',
}

export type AssetCdnConfig = {
  enabled?: boolean;
  baseUrl?: string;
  includePrefixes?: string[];
  excludePrefixes?: string[];
};

type RuntimeAssetCdnConfig = {
  enabled: boolean;
  baseUrl: string;
  includePrefixes: string[];
  excludePrefixes: string[];
};

const DEFAULT_INCLUDE_PREFIXES = ['/assets/panos/'];
const DEFAULT_EXCLUDE_PREFIXES: string[] = [];
let runtimeConfig: RuntimeAssetCdnConfig | null = null;

function normalizePrefix(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function normalizePrefixList(
  values: string[] | undefined,
  fallback: string[]
): string[] {
  const source = Array.isArray(values) && values.length > 0 ? values : fallback;
  const set = new Set<string>();
  for (const item of source) {
    if (typeof item !== 'string') continue;
    const normalized = normalizePrefix(item);
    if (!normalized) continue;
    set.add(normalized);
  }
  return Array.from(set);
}

function trimTrailingSlashes(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '');
}

function getCurrentOrigin(): string | null {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  if (typeof location !== 'undefined' && location.origin) {
    return location.origin;
  }
  return null;
}

function splitPathAndSuffix(input: string): { path: string; suffix: string } {
  const match = input.match(/^([^?#]*)([?#].*)?$/);
  if (!match) {
    return { path: input, suffix: '' };
  }
  return {
    path: match[1] || '',
    suffix: match[2] || '',
  };
}

function matchPrefix(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path.startsWith(prefix));
}

function toCdnUrl(pathWithSuffix: string, config: RuntimeAssetCdnConfig): string {
  const { path, suffix } = splitPathAndSuffix(pathWithSuffix);
  return `${config.baseUrl}${path}${suffix}`;
}

function tryRewriteAbsoluteUrl(url: string, config: RuntimeAssetCdnConfig): string | null {
  if (!/^https?:\/\//i.test(url)) {
    return null;
  }
  try {
    const parsed = new URL(url);
    const origin = getCurrentOrigin();
    if (!origin || parsed.origin !== origin) {
      return null;
    }
    if (!matchPrefix(parsed.pathname, config.includePrefixes)) {
      return null;
    }
    if (matchPrefix(parsed.pathname, config.excludePrefixes)) {
      return null;
    }
    return toCdnUrl(`${parsed.pathname}${parsed.search}${parsed.hash}`, config);
  } catch {
    return null;
  }
}

export function setAssetResolverConfig(config: AssetCdnConfig | undefined): void {
  if (!config || config.enabled === false) {
    runtimeConfig = null;
    return;
  }

  if (!config.baseUrl || typeof config.baseUrl !== 'string' || config.baseUrl.trim() === '') {
    runtimeConfig = null;
    return;
  }

  runtimeConfig = {
    enabled: true,
    baseUrl: trimTrailingSlashes(config.baseUrl.trim()),
    includePrefixes: normalizePrefixList(config.includePrefixes, DEFAULT_INCLUDE_PREFIXES),
    excludePrefixes: normalizePrefixList(config.excludePrefixes, DEFAULT_EXCLUDE_PREFIXES),
  };
}

export function getAssetResolverConfig(): AssetCdnConfig | null {
  if (!runtimeConfig) return null;
  return {
    enabled: runtimeConfig.enabled,
    baseUrl: runtimeConfig.baseUrl,
    includePrefixes: [...runtimeConfig.includePrefixes],
    excludePrefixes: [...runtimeConfig.excludePrefixes],
  };
}

export function resolveAssetUrl(url: string | undefined, _type: AssetType): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '';
  }

  const trimmedUrl = url.trim();
  const config = runtimeConfig;
  if (!config || !config.enabled) {
    return trimmedUrl;
  }

  const rewrittenAbsolute = tryRewriteAbsoluteUrl(trimmedUrl, config);
  if (rewrittenAbsolute) {
    return rewrittenAbsolute;
  }

  if (trimmedUrl.startsWith('//')) {
    return trimmedUrl;
  }

  const { path } = splitPathAndSuffix(trimmedUrl);
  if (!path.startsWith('/')) {
    return trimmedUrl;
  }

  if (!matchPrefix(path, config.includePrefixes)) {
    return trimmedUrl;
  }

  if (matchPrefix(path, config.excludePrefixes)) {
    return trimmedUrl;
  }

  return toCdnUrl(trimmedUrl, config);
}

/**
 * 预加载资源（用于缩略图等）
 */
export function preloadAsset(url: string, type: AssetType): Promise<void> {
  return new Promise((resolve, reject) => {
    const resolvedUrl = resolveAssetUrl(url, type);

    if (!resolvedUrl) {
      reject(new Error(`资源 URL 为空 (${type})`));
      return;
    }

    if (type === AssetType.VIDEO) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error(`视频加载失败: ${resolvedUrl}`));
      video.src = resolvedUrl;
    } else {
      import('./externalImage').then(({ toProxiedImageUrl }) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.crossOrigin = 'anonymous';
        (img as any).loading = 'lazy';
        img.decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`图片加载失败: ${resolvedUrl}`));
        img.src = toProxiedImageUrl(resolvedUrl);
      }).catch((error) => {
        reject(new Error(`导入代理工具失败: ${error}`));
      });
    }
  });
}
