/**
 * Introduce Cache.
 */

(function () {

  'use strict';

  // Like a bin in memcache.
  caches.open('pwa')
    .then(function (cache) {
      cache.put('/dummy', new Response('Some dummy content'));

      cache.addAll([
        '/index.html',
        '/assets/ajaxdata.json',
        '/js/tools.js',
        '/css/pure.min.css',
        new Request('/css/styles.css'),
      ])
        .then(function () {
          debug('All items successfully cached');
        });
    });

  caches.match('/dummy')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => debug(error.message, 'error'));
}());
