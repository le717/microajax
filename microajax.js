/*global XMLHttpRequest */

/*
 * Created 2015-2016 Caleb Ely
 * <http://CodeTriangle.me>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


/**
 * Perform a simple async AJAX request.
 * @param {Object} options.<[method=POST], url, data,
 *                                         [success=function], [warning=function], [error=function]>
 *                 method: GET or POST.
 *                 url: The URL to contact.
 *                 data: the content to send to the page.
 *                 success: Code to run on request success.
 *                 warning: Code to run on request warning.
 *                 error: Code to run on request error.
 */
function microAjax(options) {
  "use strict";

  // Default to POST
  if (options.method === undefined) {
    options.method = "POST";
  }

  // Define empty functions for the callbacks
  if (options.success === undefined) {
    options.success = function() {};
  }

  if (options.warning === undefined) {
    options.warning = function() {};
  }

  if (options.error === undefined) {
    options.error = function() {};
  }

  var request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.send(options.data);

  request.onload = function() {
    // Success!
    if (request.readyState === 4 && request.status === 200) {
      options.success(request.responseText);

      // We reached our target destination, but it returned an error
    } else {
      options.warning();
    }
  };

  // There was a connection error of some sort
  request.onerror = options.error();
}
