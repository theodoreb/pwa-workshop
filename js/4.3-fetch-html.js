/**
 * Cache same-origin html requests.
 *
 * Network with cache fallback.
 */

self.addEventListener('fetch', function (event) {

  var request = event.request;
  var reqURL = new URL(request.url);
  var swURL = new URL(self.location);

  var isGet = request.method === 'GET';
  var isSameHost = swURL.host === reqURL.host;
  var isHTML = /\.html$/.test(reqURL.pathname);

  if (isGet && isSameHost && isHTML) {
    console.info('Process HTML request to', request.url);

    var res = Promise.all([
        fetch(request),
        caches.open('pwa')
      ])

      .then(function ([response, cache]) {
        if (response.ok) {
          // Copy now and not in the then() because by that time it's too late,
          // the request has already been used and can't be touched again.
          cache
            .put(event.request, response.clone())
            .then(() => console.log('Response put in cache for: ', request.url));
        }
        else {
          console.warn('Response not cacheable: ', response);
        }
        return response;
      })

      .catch(function (error) {
        return caches.match(request)

          // Page is in the cache.
          .then(function (response) {
            console.warn('Serve HTML from cache');
            return response ? response : Promise.reject('Not in cache');
          })

          // When offline and page not in cache, serve the default page.
          .catch(function (error) {
            console.warn('Serve fallback for HTML page');
            return caches.match('/offline.html');
          });
      });

    event.respondWith(res);
  }
});
