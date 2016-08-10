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

  }
});
