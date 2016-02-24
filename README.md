# microAjax.js #
> A small AJAX-performing script.

## History ##
Back when I was creating my PHP-based [Hangman game](https://triangle717.wordpress.com/2015/05/18/creating-hangman-in-php-and-javascript/),
I needed a way to perform an AJAX request to the backend. Because the assignment forbid using jQuery, I fell back to "plain old" vanilla JavaScript. Wanting to keep my code clean and well organized, I split off the AJAX-performing code into a separate file.

Since then, multiple times I have reused the script each time I needed to perform an AJAX request. I finally became tired of remembering where I put the script on my computer or having to redownload it. That is why I created this repo and posted it here. Who knows, maybe it will come in handy for you too.

## Usage ##
* Load onto your site
```html
<script src="microajax.min.js"</script>
```

* Call `microAjax()`, supplying the required parameters.
```js
microAjax("http://example.com", {
  method: "GET",
  success: /* Successful request callback */,
  error: /* Request error callback */
});
```

## Parameter Documentation ##
* `url` (string): The URL for the request.
* `options` (object): The request details and options.
* `options.data` (*): The request body.
* `options.headers` (object, optional): Any headers required for the request,
   given in the format

   ```js
   {
     "header-name": "value"
   }
   ```

* `options.method` (string, optional): The request method. Defaults to GET.
* `options.ajaxMethod` (string, optional):The API method to use in the request.
   Possible values are "fetch" and "xhr".
* `options.success` (function): Request success callback.
* `options.error` (function): Request error callback.

## License ##
[MIT](LICENSE)

2015-2016 Caleb Ely