/* eslint-disable no-restricted-globals */
const CACHE_VERSION = 'v10-20260317-passive-shell-worker';
const RUNTIME_CACHE = `vr-runtime-${CACHE_VERSION}`;
const SHELL_CACHE = `vr-shell-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(Promise.resolve());
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
