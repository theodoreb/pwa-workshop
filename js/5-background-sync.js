/**
 * Background sync.
 */

self.importScripts('../assets/localforage.min.js');

self.addEventListener('sync', function(event) {
  console.log('Syncing data…', event);

  localforage.setDriver(localforage.INDEXEDDB);
  var total = 0;
  localforage.iterate(function (value, key) {
    total++;
    console.log('Processing: [', key, ', ', value, ']');
  })
  .then(function () {
    console.log(event.tag + ': ' + total + ' items processed.');
  });

  event.waitUntil(localforage.clear());
});
