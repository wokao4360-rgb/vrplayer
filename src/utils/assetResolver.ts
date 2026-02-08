/**
 * 统一资源 URL 解析：
 * 1) 可按配置改写到 CDN
 * 2) 先做 CDN 可达性探测，不可达时自动回源，避免长时间 net::ERR_* 重试
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
  baseUrls?: string[];
  includePrefixes?: string[];
  excludePrefixes?: string[];
  probePath?: string;
  probeTimeoutMs?: number;
};

type RuntimeAssetCdnConfig = {
  enabled: boolean;
  baseUrls: string[];
  includePrefixes: string[];
  excludePrefixes: string[];
  probePath: string;
  probeTimeoutMs: number;
};

type ProbeState = 'idle' | 'probing' | 'ok' | 'failed';

const DEFAULT_INCLUDE_PREFIXES = ['/assets/panos/'];
const DEFAULT_EXCLUDE_PREFIXES: string[] = [];
const DEFAULT_PROBE_PATH = '/config.json';
const DEFAULT_PROBE_TIMEOUT_MS = 1800;

let runtimeConfig: RuntimeAssetCdnConfig | null = null;
let selectedBaseUrl: string | null = null;
let probeState: ProbeState = 'idle';
let probeToken = 0;

function normalizePrefix(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function normalizePrefixList(values: string[] | undefined, fallback: string[]): string[] {
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

function normalizeBaseUrls(config: AssetCdnConfig): string[] {
  const merged: string[] = [];
  if (Array.isArray(config.baseUrls)) {
    merged.push(...config.baseUrls);
  }
  if (typeof config.baseUrl === 'string') {
    merged.push(config.baseUrl);
  }

  const set = new Set<string>();
  for (const item of merged) {
    if (typeof item !== 'string') continue;
    const normalized = trimTrailingSlashes(item.trim());
    if (!normalized) continue;
    set.add(normalized);
  }
  return Array.from(set);
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

function canRewritePath(path: string, config: RuntimeAssetCdnConfig): boolean {
  if (!matchPrefix(path, config.includePrefixes)) return false;
  if (matchPrefix(path, config.excludePrefixes)) return false;
  return true;
}

function toCdnUrl(pathWithSuffix: string, baseUrl: string): string {
  const { path, suffix } = splitPathAndSuffix(pathWithSuffix);
  return `${baseUrl}${path}${suffix}`;
}

function tryRewriteAbsoluteUrl(
  url: string,
  config: RuntimeAssetCdnConfig,
  baseUrl: string
): string | null {
  if (!/^https?:\/\//i.test(url)) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const origin = getCurrentOrigin();
    if (!origin || parsed.origin !== origin) {
      return null;
    }
    if (!canRewritePath(parsed.pathname, config)) {
      return null;
    }
    return toCdnUrl(`${parsed.pathname}${parsed.search}${parsed.hash}`, baseUrl);
  } catch {
    return null;
  }
}

function normalizeProbePath(input: string | undefined): string {
  if (typeof input !== 'string' || input.trim() === '') {
    return DEFAULT_PROBE_PATH;
  }
  const trimmed = input.trim();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function toProbeUrl(baseUrl: string, probePath: string): string {
  const suffix = probePath.includes('?') ? '&' : '?';
  return `${baseUrl}${probePath}${suffix}__cdn_probe=${Date.now()}`;
}

async function probeBaseUrl(
  baseUrl: string,
  cfg: RuntimeAssetCdnConfig,
  token: number
): Promise<boolean> {
  if (token !== probeToken) return false;
  if (typeof window === 'undefined' || typeof fetch !== 'function') return false;

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = window.setTimeout(() => controller?.abort(), cfg.probeTimeoutMs);
  try {
    const response = await fetch(toProbeUrl(baseUrl, cfg.probePath), {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      signal: controller?.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function startProbeIfNeeded(): void {
  const cfg = runtimeConfig;
  if (!cfg || !cfg.enabled) return;
  if (selectedBaseUrl) return;
  if (probeState === 'probing') return;

  if (typeof window === 'undefined' || typeof fetch !== 'function') {
    probeState = 'failed';
    return;
  }

  probeState = 'probing';
  const token = ++probeToken;

  void (async () => {
    for (const baseUrl of cfg.baseUrls) {
      const ok = await probeBaseUrl(baseUrl, cfg, token);
      if (token !== probeToken) return;
      if (ok) {
        selectedBaseUrl = baseUrl;
        probeState = 'ok';
        return;
      }
    }
    if (token !== probeToken) return;
    selectedBaseUrl = null;
    probeState = 'failed';
  })().catch(() => {
    if (token !== probeToken) return;
    selectedBaseUrl = null;
    probeState = 'failed';
  });
}

export function setAssetResolverConfig(config: AssetCdnConfig | undefined): void {
  // reset previous probing state
  probeToken += 1;
  selectedBaseUrl = null;
  probeState = 'idle';

  if (!config || config.enabled === false) {
    runtimeConfig = null;
    return;
  }

  const baseUrls = normalizeBaseUrls(config);
  if (baseUrls.length === 0) {
    runtimeConfig = null;
    return;
  }

  runtimeConfig = {
    enabled: true,
    baseUrls,
    includePrefixes: normalizePrefixList(config.includePrefixes, DEFAULT_INCLUDE_PREFIXES),
    excludePrefixes: normalizePrefixList(config.excludePrefixes, DEFAULT_EXCLUDE_PREFIXES),
    probePath: normalizeProbePath(config.probePath),
    probeTimeoutMs:
      typeof config.probeTimeoutMs === 'number' && Number.isFinite(config.probeTimeoutMs)
        ? Math.max(200, Math.floor(config.probeTimeoutMs))
        : DEFAULT_PROBE_TIMEOUT_MS,
  };

  // probe asynchronously; before probe success, keep origin URL to avoid first-screen failures
  startProbeIfNeeded();
}

export function getAssetResolverConfig(): AssetCdnConfig | null {
  if (!runtimeConfig) return null;
  return {
    enabled: runtimeConfig.enabled,
    baseUrl: selectedBaseUrl || runtimeConfig.baseUrls[0],
    baseUrls: [...runtimeConfig.baseUrls],
    includePrefixes: [...runtimeConfig.includePrefixes],
    excludePrefixes: [...runtimeConfig.excludePrefixes],
    probePath: runtimeConfig.probePath,
    probeTimeoutMs: runtimeConfig.probeTimeoutMs,
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

  const activeBaseUrl = selectedBaseUrl;
  if (!activeBaseUrl) {
    startProbeIfNeeded();
    return trimmedUrl;
  }

  const rewrittenAbsolute = tryRewriteAbsoluteUrl(trimmedUrl, config, activeBaseUrl);
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
  if (!canRewritePath(path, config)) {
    return trimmedUrl;
  }

  return toCdnUrl(trimmedUrl, activeBaseUrl);
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
      import('./externalImage')
        .then(({ toProxiedImageUrl }) => {
          const img = new Image();
          img.referrerPolicy = 'no-referrer';
          img.crossOrigin = 'anonymous';
          (img as any).loading = 'lazy';
          img.decoding = 'async';
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`图片加载失败: ${resolvedUrl}`));
          img.src = toProxiedImageUrl(resolvedUrl);
        })
        .catch((error) => {
          reject(new Error(`导入图片代理工具失败: ${error}`));
        });
    }
  });
}
