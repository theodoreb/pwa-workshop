/**
 * Serviceworker install event.
 */

self.addEventListener('install', function (event) {
  var precache = caches
    .open('pwa')
    .then(function (cache) {
      return cache.addAll([
          'offline.html',
          'index.html',
          'assets/druplicon-144.png',
          'assets/druplicon-vector.svg'
        ]);
    });

  event.waitUntil(precache);
  self.skipWaiting();
  console.log('Installed', event);
});
