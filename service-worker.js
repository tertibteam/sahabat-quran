const CACHE_NAME = "sahabat-quran-v1";

const urlsToCache = [
  "/sahabat-quran/",
  "/sahabat-quran/index.html",
  "/sahabat-quran/manifest.json",
  "/sahabat-quran/icons/icon-192.png",
  "/sahabat-quran/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
