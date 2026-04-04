const CACHE_NAME = 'jogos360-v1';
const assets = [
  'Index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'icon.png',
  'icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
