/* eslint-disable no-restricted-globals */
const CACHE_VERSION = 'v8-20260211-cross-origin-pano-cache';
const RUNTIME_CACHE = `vr-runtime-${CACHE_VERSION}`;
const SHELL_CACHE = `vr-shell-${CACHE_VERSION}`;

function isConfigRequest(pathname) {
  return pathname === '/config.json' || pathname.endsWith('/config.json');
}

function isShellAssetPath(pathname) {
  return pathname.endsWith('.js') || pathname.endsWith('.css');
}

function isPanoAssetPath(pathname) {
  return pathname.includes('/assets/panos/');
}

function getScopeBaseUrl() {
  return new URL(self.registration.scope);
}

function extractShellAssetUrls(html, indexUrl) {
  const assets = new Set();
  const pattern = /<(?:script|link)\b[^>]+(?:src|href)=["']([^"']+)["'][^>]*>/gi;
  let match = pattern.exec(html);
  while (match) {
    try {
      const target = new URL(match[1], indexUrl);
      if (target.origin === self.location.origin && isShellAssetPath(target.pathname)) {
        assets.add(target.toString());
      }
    } catch {
      // ignore invalid URLs
    }
    match = pattern.exec(html);
  }
  return Array.from(assets);
}

async function collectShellUrls() {
  const scopeBaseUrl = getScopeBaseUrl();
  const indexUrl = new URL('index.html', scopeBaseUrl).toString();
  const urls = new Set([indexUrl]);

  try {
    const response = await fetch(indexUrl, { cache: 'no-store' });
    if (response.ok) {
      const html = await response.text();
      for (const assetUrl of extractShellAssetUrls(html, indexUrl)) {
        urls.add(assetUrl);
      }
    }
  } catch {
    // network failure during install should not abort service worker installation
  }

  return Array.from(urls);
}

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  const urls = await collectShellUrls();
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'no-store' });
        if (response && response.status === 200) {
          await cache.put(url, response.clone());
        }
      } catch {
        // ignore per-resource failures
      }
    })
  );
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(precacheShell());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              ((key.startsWith('vr-runtime-') && key !== RUNTIME_CACHE) ||
                (key.startsWith('vr-shell-') && key !== SHELL_CACHE))
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  const pathname = url.pathname;
  const isPano = isPanoAssetPath(pathname);
  const isStaticSameOrigin =
    sameOrigin &&
    (
      pathname.endsWith('.js') ||
      pathname.endsWith('.css') ||
      pathname.endsWith('.wasm') ||
      pathname.endsWith('.ktx2') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.webp') ||
      pathname.endsWith('.json')
    );

  if (sameOrigin && isConfigRequest(pathname)) {
    event.respondWith(networkOnly(req));
    return;
  }

  if (isPano || isStaticSameOrigin) {
    event.respondWith(staleWhileRevalidate(req, { allowOpaque: !sameOrigin && isPano }));
    return;
  }

  if (sameOrigin && req.mode === 'navigate') {
    event.respondWith(networkFirst(req));
  }
});

async function networkOnly(req) {
  try {
    return await fetch(req, { cache: 'no-store' });
  } catch (err) {
    const runtimeCache = await caches.open(RUNTIME_CACHE);
    const fallback = await runtimeCache.match(req);
    if (fallback) return fallback;
    throw err;
  }
}

async function matchFromCaches(req) {
  const shellCache = await caches.open(SHELL_CACHE);
  const shellHit = await shellCache.match(req);
  if (shellHit) return shellHit;

  const runtimeCache = await caches.open(RUNTIME_CACHE);
  return runtimeCache.match(req);
}

function shouldCacheResponse(res, allowOpaque = false) {
  if (!res) return false;
  if (res.status === 200) return true;
  if (allowOpaque && res.type === 'opaque') return true;
  return false;
}

async function staleWhileRevalidate(req, options = {}) {
  const allowOpaque = options.allowOpaque === true;
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await matchFromCaches(req);
  const networkPromise = fetch(req)
    .then((res) => {
      if (shouldCacheResponse(res, allowOpaque)) {
        cache.put(req, res.clone());
      }
      return res;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

async function networkFirst(req) {
  const runtimeCache = await caches.open(RUNTIME_CACHE);
  try {
    const res = await fetch(req);
    if (res && res.status === 200) {
      runtimeCache.put(req, res.clone());
    }
    return res;
  } catch (err) {
    const cached = await matchFromCaches(req);
    if (cached) return cached;
    throw err;
  }
}
