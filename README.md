DuckDuckGo ZeroClickInfo Spice
=================================

About
-----

See [the contribution wiki](https://github.com/duckduckgo/duckduckgo/wiki) for a general overview on contributing to DuckDuckGo.

This repository is for contributing dynamic, external API based content to 0-click, e.g. getting the current bitcoin currency conversions. That is, each spice project will generally involve at least one HTTP request to a third-party API, though in some cases could be completely stand-alone.

We also maintain a list of [requested spice projects](https://github.com/duckduckgo/duckduckgo/wiki/Spice), but whatever you want to attempt is welcome.


Contributing
------------

First off, thank you!


### Process

1) Make sure you're in the right place. This repo is for JavaScript blocks that generally grab information based on a query from a third-paty API and then format that info for display in a 0-click box. For Perl stand-alone goodies you probably want the [goodies repo](https://github.com/duckduckgo/zeroclickinfo-goodies).

2) Develop project using the Structure below in either a fork or a branch (if a collaborator).

3) Test goodie via Testing procedure below.

4) Submit a pull request.

Feel free to ask questions!



### Structure

Each spice project has its own directory. Some of the directories are in use on the live system, and some are still in development.

Each directory has a structure like this:

```txt

# Main file, which gets called by the client at the appropriate time. 
# To understand the flow, look at example/spice.js 
project/spice.js

# Calls the js file and is used for testing. 
# Look at example/example.html for extensive workflow comments.
project/spice.html

# The js functions and files get segemented by a short namespace prefix.
# This is usually two or three letters, e.g. xk for xkcd.
# Just make something up you think makes sense.
project/spice.namespace

# Nginx conf to call the relevant external API.
# To prevent search leakage (and for caching), we run
# all calls through nginx.
# Start with the xkcd conf and try modifying it appropriately.
project/spice.conf

# Perl block to determine when to call the spice project.
# See xkcd project for a good example to start with.
project/spice.pl

# Example JSON object (returned from third-party API).
project/spice.json
```


### Testing

You should be able to test your spice project via the spice.html file in your project directory. That is, it should be able to run in your Web browser and display the information you want it to display in a stand-alone fashion.

In the same token, you should be able to run the example.html to test that you have the repository set up right. If it works, you should get a line about weather at the top.

You do not need a Web server to test, though it is of course fine if you do. That is, you should just be able to open the files locally, i.e. drag or open the appropriate HTML in your browser. 


### spice.js flow

The overall flow is as follows:

1) An external API is called with a callback function.

2) That callback function is defined by you, and takes the JSON object from the external API and parses out the information needed for display.

3) Your callback function calls the nra function with the appropriate variables. That is the internal function we use to display the 0-click box for spice projects. You pass nra a object that takes the following parameters.

```js
// Requried snippet (abstract). It can be pure HTML in which case it is set via innerHTML, but better is it is an object, in which case onclick and other event handlers won't be destroyed.
items[0]['a'] = snippet;

// Optional header. If there is a relevant (and relatively short) title, then set it here.
items[0]['h'] = title;

// Required source name and url. 
// These are used to make the More at X link in all 0-click boxes.
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

1) Look at the xkcd/spice.js file for a working live example. 


2) If you use internal variables you should put a var statement at the top of the function so they don't leak scope.


3) If you make html, e.g. by createElement, note d is a global shortcut for document, i.e. d.createElement.


4) Any functions should exist in your namespace. For example, for twitter the namespace is tr, so the main callback would named nrtr and a helper function would be nrtr_helper_function.


5) The image is automatically right-floated by default. To avoid looking bad, use <span> and <div> (if you need line breaks) instead of <p>. Also it is good to end with a <span> so the More at X line is on the same line. See the twitter project for an example.


6) Don't use jQuery. We use [YUI2](http://developer.yahoo.com/yui/2/) internally. To set styles you can do:

```js
YAHOO.util.Dom.setStyle(obj,'margin-top','5px');
```

If the whole 0-click is an image (like in the XKCD case) you can use this class on the img:

```js
YAHOO.util.Dom.addClass(img,'cizb');
```