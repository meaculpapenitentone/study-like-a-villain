const CACHE_NAME = "study-like-a-villain-v26";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./stylesStudyLikeAVillain.css",
  "./i18n/embedded-data.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

const OPTIONAL_ASSETS = [
  "./i18n/en.json",
  "./i18n/pt-BR.json",
  "./i18n/es.json",
  "./i18n/fr.json",
  "./i18n/de.json",
  "./i18n/it.json",
  "./i18n/ja.json",
  "./i18n/quotes/en.json",
  "./i18n/quotes/pt-BR.json",
  "./i18n/quotes/es.json",
  "./i18n/quotes/fr.json",
  "./i18n/quotes/de.json",
  "./i18n/quotes/it.json",
  "./i18n/quotes/ja.json",
  "./screenshots/home-desktop.png",
  "./screenshots/timer-desktop.png",
  "./screenshots/tutorial-desktop.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS)
        .then(() => Promise.allSettled(
          OPTIONAL_ASSETS.map(asset => cache.add(asset))
        ))
      )
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
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
  );
});
