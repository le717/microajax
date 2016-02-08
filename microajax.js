/*global XMLHttpRequest */

/*
 * microAjax
 * Created 2015 Triangle717
 * <http://le717.github.io/>
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

  // Send the POST header if needed
  if (options.method.toLowerCase() === "post") {
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  }
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
