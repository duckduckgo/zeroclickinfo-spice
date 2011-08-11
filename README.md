DuckDuckGo ZeroClickInfo Spice
=================================

About
-----

See https://github.com/duckduckgo/duckduckgo/wiki for a general overview on contributing to DuckDuckGo.

This repository is for contributing dynamic, external API based content to 0-click, e.g. getting the current bitcoin currency conversions. 


Contributing
------------

This repository is organized by type of content, each with its own directory. Some of those projects are in use on the live system, and some are still in development.

Inside each directory are files named

* project/spice.js

This file is what gets called by our systems at the appropriate time. To understand the flow, look at example/spice.js 

* project/spice.html

This file calls the js file and is used to see if it is working. Look at example/example.html for extensive workflow comments.

If you download the repository you should be able to run that example.html in your browser live, and it should work! You do not need a Web server to do this; just open it in your browser, i.e. drag it there. If it works, you should get a line about weather at the top.


JavaScript
------------

Look at the xkcd/spice.js file for a working example. You will see that this example calls some functions that aid in rendering.

If you use internal variables you should put a var statement at the top of the function so they don't leak scope.

If you make html, e.g. by createElement, note d is a global shortcut for document, i.e. d.createElement.

We also use YUI so to set styles you can do:

```js
YAHOO.util.Dom.setStyle(obj,'margin-top','5px');
```


If the whole 0-click is an image (like in the XKCD case) you can use this class on the img:

```js
YAHOO.util.Dom.addClass(img,'cizb');
```


nra is the function that does the rendering of the 0-click box. It takes the following parameters with the items array passed to it.

```js
// Requried snippet (abstract). It can be pure HTML in which case it is set via innerHTML, but better is it is an object, in which case onclick and other event handlers won't be destroyed.
items[0]['a'] = snippet;

// Optional header. If there is a relevant (and relatively short) title, then set it here.
items[0]['h'] = title;

// Required source name and url. These are used to make the More at X link in all 0-click boxes.
items[0]['s'] = 'XKCD';
items[0]['u'] = url

// Optional force of a bigger box. Usually the box is auto-resized smaller with an expansion UI if needed. Generally you shouldn't force it to be bigger, but in the XKCD case you don't want the big image to be cutoff.
items[0]['f'] = 1

// Optional image. If there is a thumbnail image, we will display it on the right.
items[0]['i'] = image_url
*/
```


