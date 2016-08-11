/**
 * Cache same-origin html requests.
 *
 * Stale while revalidate and hard timeout.
 */

self.addEventListener('fetch', function (event) {

  var request = event.request;
  var reqURL = new URL(request.url);
  var swURL = new URL(self.location);

  var isGet = request.method === 'GET';
  var isDifferentHost = swURL.host !== reqURL.host;

  if (isGet && isDifferentHost) {
    console.log('Process Third party request to', request.url);

    // 1) serve third party asset from cache.
    var res = caches.match(request);

    // 2) if not in cache, fetch it and add it to the cache.
    // 3) make a 500ms timeout promise.
    // 3) use that promise to prevent the fetch if it takes more than 500ms.
    //    You will need to use Promise.race([])


    event.respondWith(res);
  }
});
