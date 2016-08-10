/**
 * Main serviceworker file.
 */

self.importScripts('js/4.1-install.js');

// To see what is going on.
self.addEventListener('fetch', (event) => console.log(event));

//self.importScripts('js/4.2-fetch-assets.js');
//self.importScripts('js/4.3-fetch-html.js');
//self.importScripts('js/4.4-fetch-third-party.js');

//self.importScripts('js/5-background-sync.js');
//self.importScripts('js/6-push-notifications.js');
