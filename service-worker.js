const CACHE_NAME = "sahabat-quran-v2";

const urlsToCache = [
  "/sahabat-quran/",
  "/sahabat-quran/index.html",
  "/sahabat-quran/manifest.json",
  "/sahabat-quran/icons/icon-192.png",
  "/sahabat-quran/icons/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // Network-first for HTML — always get latest index.html
  if (event.request.url.endsWith('.html') || event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
