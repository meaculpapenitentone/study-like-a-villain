const CACHE_NAME = "study-like-a-villain-v16";

const CORE_ASSETS = [
  "./",
  "index.html",
  "stylesStudyLikeAVillain.css",
  "manifest.json",
  "i18n/en.json",
  "i18n/pt-BR.json",
  "i18n/es.json",
  "i18n/fr.json",
  "i18n/de.json",
  "i18n/it.json",
  "i18n/ja.json",
  "i18n/quotes/en.json",
  "i18n/quotes/pt-BR.json",
  "i18n/quotes/es.json",
  "i18n/quotes/fr.json",
  "i18n/quotes/de.json",
  "i18n/quotes/it.json",
  "i18n/quotes/ja.json",
  "icons/icon-source.png",
  "icons/icon-1024.png",
  "icons/icon-512.png",
  "icons/icon-192.png",
  "icons/icon-180.png",
  "icons/icon-64.png",
  "icons/icon-32.png",
  "icons/icon-16.png",
  "screenshots/home-desktop.png",
  "screenshots/cycle-options-desktop.png",
  "screenshots/timer-desktop.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const shouldPreferNetwork =
    event.request.mode === "navigate" ||
    requestUrl.pathname.endsWith(".html") ||
    requestUrl.pathname.endsWith(".css") ||
    requestUrl.pathname.endsWith(".js") ||
    requestUrl.pathname.endsWith(".json");

  if (shouldPreferNetwork) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request).then(cachedResponse => {
          return cachedResponse || caches.match("index.html");
        }))
    );
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
  );
});
