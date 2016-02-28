/*
 * Created 2015-2016 Caleb Ely
 * <http://CodeTriangle.me>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


var microAjax = (function() {
  "use strict";
  /**
   * @private
   * Make a request using XMLHttpRequest.
   * {@link https://xhr.spec.whatwg.org/ XMLHttpRequest spec}
   *
   * @param {Object} options - The request options.
   */
  function _ajaxHttpRequest(options) {
    var request = new XMLHttpRequest();
    request.open(options.method, options.url, true);

    // Set any request headers
    if (options.headers) {
      for (var key in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, key)) {
          request.setRequestHeader(key, options.headers[key]);
        }
      }
    }

    request.onload = function() {
      // Success!
      if (request.readyState === 4 && request.status === 200) {
        options.success(request.response);

        // We reached our target destination, but it returned an error
      } else {
        options.error(request);
      }
    };

    // Make the request
    request.send(options.data);
  }


  /**
   * @private
   * Make a request using the Fetch API.
   * {@link https://fetch.spec.whatwg.org/ Fetch spec}
   *
   * @param {Object} options - The request options.
   */
  function _ajaxFetch(options) {
    // Fetch API options
    var fetchInit = {
      method: options.method,
      body: options.data
    };

    // Set any request headers
    if (options.headers) {
      fetchInit.headers = options.headers;
    }

    // TODO https://github.com/github/fetch
    // TODO Does this work correctly?
    window.fetch(options.url, fetchInit)
    .then(options.success)
    .catch(options.error);
  }


  /**
   * Perform a simple async AJAX request.
   * When available, favors the Fetch API over XMLHttpRequest
   * unless overridden in the options.
   *
   * @param {string} url - The URL for the request.
   * @param {Object} options - The request details and options.
   * @param {*} options.data - The request body.
   * @param {Object} [options.headers] - Any headers required for the request,
   *                                     given in the format
   *                                     `{ "header-name": "value" }`.
   * @param {string} [options.method=GET] - The request method.
   * @param {string} [options.ajaxMethod] - The API method to use in the request.
   *                                        Possible values are "fetch" and "xhr".
   * @param {function} options.success - Request success callback.
   * @param {function} options.error - Error callback.
   */
  function _microAjax(url, options) {
    // Add the url to the options for a nicer transition
    // to the appropriate AJAX method
    options.url = url;

    // Empty function in case
    // we need to set default callbacks
    function noop() {}

    // Default to GET
    if (!options.method) {
      options.method = "GET";
    }

    // Define empty functions for the callbacks if needed
    // TODO Multiple callbacks?
    if (!options.success) {
      options.success = noop;
    }

    if (!options.error) {
      options.error = noop;
    }

    // Favor the Fetch API if present
    var ajaxMethod = (window.fetch ? _ajaxFetch : _ajaxHttpRequest);

    // But allow the user to choose between Fetch and XHR
    if (options.ajaxMethod) {
      if (options.ajaxMethod === "fetch") {
        ajaxMethod = _ajaxFetch;
      } else if (options.ajaxMethod === "xhr") {
        ajaxMethod = _ajaxHttpRequest;
      }
    }

    // Make the request using the desired API
    ajaxMethod(options);
  }

  return _microAjax;
}());
