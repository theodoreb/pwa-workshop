/**
 * Cache same-origin non-html requests.
 *
 * Stale while revalidate.
 */

self.addEventListener('fetch', function (event) {

  var request = event.request;
  var reqURL = new URL(request.url);
  var swURL = new URL(self.location);

  var isGet = request.method === 'GET';
  var isSameHost = swURL.host === reqURL.host;
  var isNotHTML = !/\.html$/.test(reqURL.pathname);

  if (isGet && isSameHost && isNotHTML) {
    console.info('Process non-HTML request to', request.url);
    var res = caches.match(request)

      .then(function (response) {
        return !!response ? response : Promise.reject('Ressource not in cache');
      })

      .catch(function (error) {
        var fetchNcache = Promise.all([
          fetch(request),
          caches.open('pwa')
        ]);

        return fetchNcache
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

          .catch(function () {
            // If offline, return an empty response.
            console.warn('Empty response returned for asset');
            return new Response('');
          });
      });

    event.respondWith(res);
  }
});
