// SemesterOS PWA Service Worker (v1.1.0)
const CACHE_NAME = 'semesteros-shell-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // HTML Navigation: Network-first, fall back to cached shell index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
        .then((response) => response || caches.match('/index.html'))
    );
    return;
  }

  // Same-origin static assets: Cache-first, fall back to network, cache network response
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => {
          // Return empty response for uncached asset during offline
          return new Response('Asset not available offline', { 
            status: 503, 
            statusText: 'Service Unavailable Offline', 
            headers: { 'Content-Type': 'text/plain' } 
          });
        });
      })
    );
    return;
  }

  // Cross-origin assets (e.g. Google Fonts)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        return new Response('External resource unavailable offline', { 
          status: 503, 
          headers: { 'Content-Type': 'text/plain' } 
        });
      });
    })
  );
});
