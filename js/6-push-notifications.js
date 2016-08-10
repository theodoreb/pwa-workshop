/**
 * Push notifications.
 */

self.addEventListener('push', function (event) {

  var title = 'Notification';
  var body = `Custom notification text!
  
It's great, let's put all the content in the world in the notification area. 
`;
  var icon = '/assets/druplicon-144.png';
  var tag = 'push';

  event.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: icon,
    tag: tag
  }));
});
