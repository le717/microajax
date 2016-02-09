# microAjax.js #
> A small AJAX-performing script.

## History ##
Back when I was creating my PHP-based [Hangman game](https://triangle717.wordpress.com/2015/05/18/creating-hangman-in-php-and-javascript/),
I needed a way to perform an AJAX request to the backend. Because the assignment forbid using jQuery, I fell back to "plain old" vanilla JavaScript. Wanting to keep my code clean and well organized, I split off the AJAX-performing code into a separate file.

Since then, multiple times I have reused the script each time I needed to perform an AJAX request. I finally became tired of remembering where I put the script on my computer or having to redownload it. That is why I created this repo and posted it here. Who knows, maybe it will come in handy for you too.

## Usage ##
1. Load onto your site
```html
<script src="microajax.min.js"</script>
```
2. Call `microAjax()`, supplying the required `options` object.
```js
microAjax({
  url: "http://example.com",
  method: "GET",
  success: /* Successful request callback */,
  warning: /* Request warning callback */,
  error: /* Request error callback */
});
```

## License ##
[MIT](LICENSE)

2015-2016 Caleb Ely