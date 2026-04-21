const CACHE_NAME = 'roadtrip-thai-v2';
const ASSETS = [
  '/roadtrip-thailande/',
  '/roadtrip-thailande/index.html',
  '/roadtrip-thailande/manifest.json',
  '/roadtrip-thailande/apple-touch-icon.png',
  '/roadtrip-thailande/icon-192.png',
  '/roadtrip-thailande/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).catch(function() {
        return caches.match('/roadtrip-thailande/index.html');
      });
    })
  );
});
