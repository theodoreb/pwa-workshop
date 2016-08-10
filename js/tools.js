/**
 * utility methods.
 */

(function () {

  'use strict';

  var log = document.querySelector('#console');

  window.debug = function (message, type = 'log', pretty = 2) {
    if (typeof message === 'string' && message.trim()) {
      console[type](message.trim());
    }
    if (typeof message === 'object') {
      console[type](message);
      message = JSON.stringify(message, null, pretty);
    }
    log.appendChild(document.createTextNode(message + '\n'));
  };

  window.random = function (max) {
    return Math.round(Math.random() * max);
  };

  window.$ = function (query) {
    return document.querySelector(query);
  };

  window.$$ = function (query) {
    return document.querySelectorAll(query);
  };


  // From https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js
  const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
  const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
  const concat = Function.bind.call(Function.call, Array.prototype.concat);
  const keys = Reflect.ownKeys;

  if (!Object.values) {
    Object.values = function values(O) {
      return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
    };
  }

  if (!Object.entries) {
    Object.entries = function entries(O) {
      return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
    };
  }

}());
