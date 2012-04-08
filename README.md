DuckDuckGO Spice Plugins
=================================

See [DuckDuckHack](http://duckduckhack.com/) for an overview of the DuckDuckGo plugin system.

This repository is for contributing spice plugins. Each spice plugin will generally involve at least one HTTP(S) request to a third-party JavaScript API, though in some cases could be completely stand-alone. These API calls will return JSON objects to callback functions that you will specify.

Spice plugins are in beta and both the interface and testing procedure will improve over time. However, you can work away without worrying about what any changes might do to your plugins -- we'll take care of all that.


Contributing
------------

First off, thank you!


### Process

1) Pick [a spice project](https://duckduckgo.uservoice.com/forums/5168-plugins/category/41838-spice) (or add one) and comment that you're working on it.

2) Develop your plugin using the Structure below [in a fork](http://help.github.com/fork-a-repo/).

3) Test your plugin via Testing procedure below.

4) Submit a [pull request](http://help.github.com/send-pull-requests/).

Feel free to [ask questions](http://duckduckhack.com/#faq)!



### Structure

Each spice plugin currently produces three files. The first file is described in the [DuckDuckHack plugin tutorial](http://duckduckhack.com/#plugin-tutorial) and you should start there.

When finished you will have made your plugin triggers file within the [lib/DDG/Spice](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/lib/DDG/Spice) directory.

The other two files should be placed in a project directory within [share/spice](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/share/spice).

Each directory has a structure like this:

```txt
# Main file, which gets called by the client at the appropriate time. 
# This file defines the callback function and any helper functions you need
# to process data that gets returned from the JSONP APIs.
plugin/spice.js

# Nginx conf to call the relevant external API.
# To prevent search leakage (and for caching), we run
# all calls through nginx.
# Start with the xkcd conf and try modifying it appropriately.
# In a future iteration this will be produced automatically.
plugin/nginx.conf
```


### Testing

In a future iteration we'll give you a Web server testing facility that you an query.

For now, however, you should be able to test your spice plugin in your browser locally. To do so make an HTML file with a script tag that calls the external JSONP api. Then put your callback function in the same file. The API will return the JSON object to your callback function.


### spice.js flow

The overall flow is as follows:

1) An external API is called with a callback function.

2) That callback function is defined by you, and takes the JSON object from the external API and parses out the information needed for display.

3) Your callback function calls the nra function with the appropriate variables. That is the internal function we use to display the Zero-click Info box for spice plugins. You pass nra a object that takes the following parameters. We are in the process of cleaning up this interface to be way more intuitive :)

```js
// Requried snippet (abstract). It can be pure HTML in which case it is set via innerHTML, but better is it is an object, in which case onclick and other event handlers won't be destroyed.
items[0]['a'] = snippet;

// Optional header. If there is a relevant (and relatively short) title, then set it here.
items[0]['h'] = title;

// Required source name and url. 
// These are used to make the More at X link in all Zero-click Info boxes.
// 's' should be the main name.
items[0]['s'] = 'XKCD';
items[0]['u'] = url

// Optional force of a bigger box. Usually the box is auto-resized smaller with an expansion UI if needed. Generally you shouldn't force it to be bigger, but in the XKCD case you don't want the big image to be cutoff.
items[0]['f'] = 1

// Optional image. If there is a thumbnail image, we will display it on the right.
items[0]['i'] = image_url
*/
```


### Notes

1) Look at [existing plugins](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/share/spice) for some examples. 


2) If you use internal variables you should put a var statement at the top of the function so they don't leak scope.


3) If you make html, e.g. by createElement, note d is a global shortcut for document, i.e. d.createElement. (In future versions of the interface we will be backing off from creating display elements directly.)


4) Any functions should exist in your namespace. For example, for twitter the namespace is tr, so the main callback would named nrtr and a helper function would be nrtr_helper_function.


5) The image is automatically right-floated by default. To avoid looking bad, use <span> and <div> (if you need line breaks) instead of <p>. Also it is good to end with a <span> so the More at X line is on the same line. See the [twitter plugin](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/twitter/spice.js) for an example.


6) Don't use jQuery. We use [YUI2](http://developer.yahoo.com/yui/2/) internally. To set styles you can do:

```js
YAHOO.util.Dom.setStyle(obj,'margin-top','5px');
```

If the whole Zero-click Info is an image (like in the XKCD case) you can use this class on the img:

```js
YAHOO.util.Dom.addClass(img,'img_zero_click_big');
```