const self = this;
const cacheVersion = 'version-1';
const offlineURL = 'offline.html';
const currentCache = {
  offline: `offline-cache${cacheVersion}`,
};

// install
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(currentCache.offline).then((cache) => {
      return cache.addAll(['/', './offline_bg.png', offlineURL]);
    })
  );
});

// fetch from cache
this.addEventListener('fetch', (event) => {
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url).catch((error) => {
        console.log(error);
        return caches.match(offlineURL);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// activate service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(currentCache.offline);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return cacheName;
        })
      ).catch((err) => {
        console.log('error activating service worker', err);
      })
    )
  );
});
