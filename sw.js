const CACHE_NAME = "limit-trader-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./add-trade.html",
  "./history.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
