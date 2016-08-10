/**
 * Introduce fetch, Request, Response, ReadableStream.
 */

(function () {

  'use strict';


  var url = new URL('/assets/ajaxdata.json?param1=ok&array[]=1&array[]=2', window.location);

  window.testFetch = function () {
    // Using a Request object.
    fetch(new Request(url))
      .then(function (response) { console.log(response); debug('\nfetched: ' + url); return response.json(); })
      .then(function (data) { debug(data, 'log', null); })
      .catch(function (error) { debug(error, 'error'); });

    // Using an url.
    fetch('/assets/ajaxdata.json')
      .then(function (response) { console.log(response); debug('fetched: /assets/ajaxdata.json'); return response.json(); })
      .then(function (data) { debug(data, 'log', null); })
      .catch(function (error) { console.error(error); });
  };

  window.testFetchCORS = function () {
    // Distant CORS-enabled url.
    fetch('https://api.github.com/repos/theodoreb/theodoreb.github.io/issues/14/comments')
      .then(function (response) { console.log('CORS: ', response); debug('\nfetched (cors): https://api.github.com/…/14/comments'); return response.json(); })
      .then(function (data) { debug(data); })
      .catch(function (error) { console.error(error) });
  };

  window.testFetchNoCORS = function () {
    // Distant non CORS-enabled url.
    fetch('https://www.google.com/', {mode: 'no-cors'})
      .then(function (response) { debug('\nfetched (no-cors): https://www.google.com/'); debug(`response type: ${response.type}`); console.log('NO-CORS: ', response); })
      .catch(function (error) { console.error(error) });
  };

  window.testSearchParams = function () {
    debug('\nSearch string: ' + url.searchParams.toString());
    for (var param of url.searchParams.entries()) {
      debug(param, 'log', null);
    }
  };

}());
