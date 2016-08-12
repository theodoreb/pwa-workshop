/**
 * Introduce Promise.
 *
 * Implement attachBehaviors with dependencies support.
 */

(function (startTime) {
  'use strict';



  var behaviors = {};

  behaviors.dragNDrop = new Promise(function (resolve, reject) {
    setTimeout(resolve, random(1000));
  });

  behaviors.loadImage = new Promise(function (resolve, reject) {
    setTimeout(resolve, random(1000));
  });

  //behaviors.alreadyOK = Promise.resolve();

  //behaviors.failProms = Promise.reject();

  // Handle behaviors functions with dependencies.
  behaviors.intercept = Promise.all([behaviors.dragNDrop, behaviors.loadImage])
    .then(function (timers) {
      debug('');
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, random(500));
      });
    });


  // Add a log function to all promise.
  var allPromises = Object.entries(behaviors).map(function (entry) {
    return entry[1].then(function () {
      debug(`init: ${entry[0]} @ ${(new Date()) - startTime}ms`);
    });
  });


  Promise.all(allPromises)
    .then(function () {
      debug('\n\n𝗔𝗹𝗹 𝗶𝗻𝗶𝘁 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝘀 𝗳𝗶𝗻𝗶𝘀𝗵𝗲𝗱', 'info');
    })
    .catch(function (error) {
      debug('\n\n𝗘𝗿𝗿𝗼𝗿 𝗱𝘂𝗿𝗶𝗻𝗴 𝗶𝗻𝗶𝘁', 'warn');
      debug(`error: ${error.message}`, 'error');
    });

  /*
  var pageViewDelay = random(1000);

  var pageViewPromise = function (resolve, reject) {
    if (pageViewDelay <= 200) {
      throw new Error('pageViewDelay needs to be greater than 200');
    }
    setTimeout(resolve, pageViewDelay);
  };

  new Promise(pageViewPromise)
    .then(function (time) {
      debug(`Page opened ${(new Date()) - startTime}ms ago.`, 'info');
    })
    .catch(function (error) {
      debug(`error: ${error.message}`, 'error');
    });
  */

}(new Date()));
