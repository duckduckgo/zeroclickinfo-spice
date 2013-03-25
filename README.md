DuckDuckHack Spice
====
This documentation walks you through the process of writing a DuckDuckHack Spice plugin.
Before reading this section, make sure you've read the [DuckDuckHack Intro Site](http://duckduckhack.com) and the [DuckDuckHack Developer's Overview](https://github.com/duckduckgo/duckduckgo/blob/master/README.md). If you're here to brush up on Spice-related info, go ahead and scroll down. If you're here to learn how to write Spice plugins, head on over to the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview).

## Spice Handle Functions
Spice plugins have **triggers** and **handle** functions like Goodies, as explained in the [Basic tutorial](http://github.com/duckduckgo/duckduckgo#basic-tutorial). The difference is that Spice handle functions don't return an instant answer directly like Goodies. Instead, they return arguments used to call a JavaScript callback function that then returns the instant answer.

The JavaScript callback function is defined in another file and is explained in detail in the [Spice callback functions](#spice-callback-functions) section. For now let's concentrate on how it gets called via the Spice handle function.

Usually the Spice plugin flow works like this:

* Spice plugin is triggered.
* Spice handle function is called.
* Spice handle function returns arguments.
* Arguments are used to make a call to an external [JSONP](https://duckduckgo.com/?q=jsonp) API.
* The external API returns a [JSON](https://duckduckgo.com/?q=JSON) object to the Spice callback function.
* Spice callback function returns instant answer.
* Instant answer formatted on screen.

The following is [an example](https://duckduckgo.com/?q=xkcd) that calls [the XKCD API](http://xkcd.com/json.html). Within your **zeroclickinfo-spice** fork, you would define a similar file in the **/lib/DDG/Spice/** directory. This file is named **Xkcd.pm**.

```perl
package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

spice to => 'http://dynamic.xkcd.com/api-0/jsonp/comic/$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
  
  if ($_ =~ /^(\d+|r(?:andom)?)$/) {
    return int rand 1122 if $1 =~ /r/;
    return $1;
  }
  
  return '' if $_ eq '';
  return;
};

1;
```

To refresh your memory, the **triggers** keyword tells the plugin system when to call a plugin. In the [Basic tutorial](https://github.com/duckduckgo/duckduckgo#basic-tutorial) we discussed using the **start** keyword to specify trigger words that need to be present at the beginning of the query.

In this case we are using the trigger **startend** keyword to specify trigger words that need to be present at the beginning of the query or at the ending.

In the **handle** function we use the **remainder** keyword to pass along the remainder of the query, after removing the trigger word from it.

```perl
handle remainder => sub {
  
  if ($_ =~ /^(\d+|r(?:andom)?)$/) {
    return int rand 1122 if $1 =~ /r/;
    return $1;
  }
  
  return '' if $_ eq '';
  return;
};
```

Our **handle** function first uses an **if** statement which checks to see if the **remainder** matches one of two things using a regular expression:

The ```\d+``` matches 1 or more numerical characters (0-9) while the string ```r(?:andom)?``` checks for at least the letter "r" but also checks for the letters "andom" after the "r". The regular expression's round brackets indicate our regular expression will capture whatever matches the inside expression and the **pipe** ("|") inside the brackets means it will match either the expression to the right or the left. So out regular expression looks to match and capture **either** a string of digits, or the strings "r" or "random".

The first return line : ```return int rand 1122 if $1 =~ /r/;``` returns a random integer if the **remainder** string has an "r" in it. Which, given the qualifying **if** statement means the user didn't specify a number for the comic they want to use, so generate a random number and show them that comic.

If at this point the the string did not have an "r" in it, the **handle** function will not have returned yet, so the next line: ```return $1``` means return whatever was captured in the **if** statement. Given then previous return statement, this return statement will only be reached if the **remainder** is only a string of digits, and so they will have been captured and stored in the ```$1``` variable, which we are returning.

If our **if** statement returns false, it means the *remainder** could be empty, or it could be some other string which isn't just digits or the word "random". 

The next line: ```return '' if $_ eq ''``` returns a blank string when our **remainder** is equal to a blank string. This means the entire query was just "xkcd" and so the remainder is equal to ''.

If our handle function hasn't returned by this point it can only mean that the **remainder** must be something else. If the original query was "xkcd comics", then the **remainder** would be "comics" and since this doesn't match any of the previous conditions, we return nothing, which short circuits the eventual external call.

```perl
   return;
```

When either a number is given and returned or a random number is generated and returned, we then plug it into the **spice to** definition.

```perl
spice to => 'http://dynamic.xkcd.com/api-0/jsonp/comic/$1';
```

The **$1** value (or ```int rand```) from the return statements will get inserted into the **$1** placeholder in the **spice to** line such that you can plug in parameters to the API call as needed. For passing multiple parameters, check out the [Advanced spice handlers](#advanced-spice-handlers) section.

Usually JSONP API's have a **callback** parameter, where we give it a value of "{{callback}}" like this: ```&callback={{callback}}". This **{{callback}}** template gets plugged in automatically with the default callback value of **ddg_spice_xkcd**. That last part (xkcd) is a lowercase version of the plugin name with different words separated by the **_** character.

At this point the response moves from the backend to the frontend. The external API sends a JSON object to the callback function that you will also define (as explained in the [Spice callback functions](#spice-callback-functions) section).

In this case however, the XKCD API doesn't actually return a JSON object (it just returns a string) so we use the next line ```spice wrap_jsonp_callback => 1;
``` which forces the API's response to be in the form of a JSON object.
 
### Where to go now:
Click to return to the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview).


## Spice Callback Functions

Before reading this section, make sure you've read the [basic tutorial](https://github.com/duckduckgo/duckduckgo#basic-tutorial), the section on [spice handle functions](#spice-handle-functions), and the section on [testing triggers](https://github.com/duckduckgo/duckduckgo#testing-triggers).

As explained in the [Spice handle functions](#spice-handle-functions) section, a Spice plugin usually calls an external API and returns a JSON object to a callback function. This section explains what that callback function looks like.

*Please note:* the interface of the callback function is the most beta part of the Spice system, and will be changing soon (for the better). However, you can work away without worrying about what any changes might do to your plugins -- we'll take care of all that.

The callback function is named **ddg_spice_plugin_name** where **plugin_name** becomes the name of your plugin. For example, for the [Twitter plugin](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/twitter/spice.js) the callback name is **ddg_spice_twitter**. For multiple word names the CamelCase in the plugin name becomes lower case and separated by _, e.g. HackerNews becomes hacker_news.

Whereas the Spice handle function went in the **/lib/DDG/Spice/** directory, the callback function goes in the **/share/spice/plugin_name** directory. You will need to make that directory. The callback function then gets placed inside a file called **spice.js**.

Here's a very simple callback function used in the [Expatistan Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/expatistan/spice.js) at **/share/spice/expatistan/spice.js**:

```js
function ddg_spice_expatistan(ir) {
    var snippet = '';
    if (ir['status'] == 'OK') {
       snippet = ir['abstract'];
       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['h'] = '';
       items[0]['s'] = 'Expatistan';
       items[0]['u'] = ir['source_url'];
       nra(items);
    }
}
```

The end result is a call to the **nra** function, an internal display function that takes what you send it and formats it for instant answer display. 

```js
       nra(items);
```

We're sending it a JavaScript Array we created called items.

```js
       items = new Array();
```

The first item in the Array is the main answer. It is another JavaScript Array.

```js
       items[0] = new Array();
```

An item takes the following parameters. 

```js
items[0]['a'] = snippet;
```

The **a** param is the required answer. It can be pure HTML in which case it is set via innerHTML. It can also be an object (preferred), in which case onclick and other event handlers won't be destroyed.

The **h** param is an optional relevant (and relatively short) title. 

```js
items[0]['h'] = title;
```

Source name and URL are required in the **s** and **u** blocks. These are used to make the More at X link in all instant answer boxes. Think of it as source attribution.

```js
items[0]['s'] = 'XKCD';
items[0]['u'] = url
```

An optional image can be passed in the **i** param. If there is a thumbnail image, we will display it on the right.

```
items[0]['i'] = image_url
```

You would usually get the information to make these assignments via the object returned to the callback function. In this case we received it in the **ir** variable but you can name it anything.

```js
function ddg_spice_expatistan(ir) {
```

### Where to go now:
Click to return to the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview).

## Testing Spice
You should have already tested your Spice triggers by following the [Testing triggers](https://github.com/duckduckgo/duckduckgo#testing-triggers) section. Once you're confident your triggers are functioning properly, follow these steps to see your Spice plugin on a live server!

**Step 1.**  &nbsp;Go to the roof of your forked repository.

```bash
cd zeroclickinfo-spice/
```

**Step 2.**  &nbsp;Start the server.

```bash
duckpan server
```

This command will start up a small Web server running on port 5000 on your machine.

**Step 3.**  &nbsp;Visit the server in your browser.

You should now be able to go to your duckpan server via a regular Web browser and check it out. It runs code from our site and so generally looks like a real version of DuckDuckGo. 

If you're running the duckpan server on the same computer as your Web browser you can navigate to:

```bash
http://127.0.0.1:5000/
```

If you're running the duckpan server on a remote machine, then substitute 127.0.0.1 wither either its IP address or its Fully Qualified Domain Name.

**Step 4.**  &nbsp;Search.

Given you've already tested your plugin triggers, you should be able to search and see your spice output come through the server. As requests go through the internal Web server they are printed to STDOUT (on the screen). External API calls are highlighted (if you have color turned on in your terminal).

**Step 5.** &nbsp;Debug.

If for some reason a search doesn't hit a plugin, there is an error message displayed on the homepage saying "Sorry, no hit for your plugins." 

If it does hit and you do not see something displayed on the screen, a number of things could be going wrong.

* You have a JavaScript error of some kind. Check out the JavaScript console for details. Personally we like to use [Firebug](http://getfirebug.com/) internally.

* The external API was not called correctly. You should be able to examine the Web server output to make sure the right API is being called. If it's not you will need to revise your [Spice handle function](#spice-handle-functions).

* The external API did not return anything. Firebug is great for checking this as well. You should see the call in your browser and then you can examine the response.


**Step 6.** &nbsp;Tweak the display.

Once everything is working properly (and you have stuff displayed on screen), you will want to mess with your callback function to get the display nice and perfect. Check out the [Guidelines](https://github.com/duckduckgo/duckduckgo#guidelines) for some pointers.

**Step 7.** &nbsp;Document. 

Finally, please document as much as possible using in-line comments.

### Where to go now:
Click to return to the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview).

----

Advanced Spice
===
##Advanced Spice Handlers
These advanced handle function techniques are specific to Spice plugins:

**Multiple parameters in spice_to call**. If you need to substitute multiple parameters into the API call like how the [RandWord Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandWord.pm) uses two numbers to specify the min and max length of the random word, you can use **from** keyword.

```perl
spice from => '(?:([0-9]+)\-([0-9]+)|)';
```

Whatever you return from the handle function gets sent to this **spice from** regexp, which then gets fed into the **spice to** API. 

```perl
spice to => 'http://api.wordnik.com/v4/words.json/randomWord?minLength=$1&maxLength=$2&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
```

In this case, the two capture blocks will be put into $1 and $2 respectively.

The reason why you do not need to specify a **from** keyword by default is that the default is **(.*)**, which means whatever you return gets put into $1.

**Feeding multiple arguments to spice from**. You can have multiple return values in your handle function like the [AlternativeTo Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/AlternativeTo.pm).

```perl
return $prog, $platform, $license;
```

In this case they are URL encoded and joined together with '/' chars, e.g. in this case **$prog/$platform/$license**. Then that full string is fed into the **spice from** regexp.

```perl
spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
```

**API Keys**. Some APIs require API keys to function properly like in the [RandWord Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandWord.pm). You can insert an API key for testing in the callback function and replace it with a variable reference when submitting.

```perl
spice to => 'http://api.wordnik.com/v4/words.json/randomWord?minLength=$1&maxLength=$2&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
```

You can set the variable when you start duckpan server like this:

```bash
DDG_SPICE_RANDWORD_APIKEY=xyz duckpan server
```

**JSON -> JSONP**. Some APIs don't do JSONP by default, i.e. don't have the ability to return the JSON object to a callback function. In this case, first you should try to contact the API provider and see if it can be added. Where it cannot, you can tell us to wrap the JSON object return in a callback function like in the [XKCD Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Xkcd.pm).

```perl
spice wrap_jsonp_callback => 1;
```

**Pure JS functions**. Sometimes no external API is necessary to deliver the instant answer like how the [Flash Version Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/FlashVersion.pm) just prints out your [Flash Player version](https://duckduckgo.com/?q=flash+version) using an [internal call](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/flash_version/spice.js).

In cases like these you can define a **spice_call_type** as 'self' like this:

```perl
spice call_type => 'self';
```

Then in the handle function you can return call, e.g.:

```perl
return $_ eq 'flash version' ? call : ();
```

The return of **call** will run whatever is in the **call_type** setting. **self** is a special keyword to just run the callback function directly, in this case **ddg_spice_flash_version()**.

**No caching of the external API call.** By default, we cache return values from external providers for speed. We use [nginx](https://duckduckgo.com/?q=nginx) and get this functionality by using the [proxy_cache_valid](http://wiki.nginx.org/HttpProxyModule#proxy_cache_valid) directive. You can override our default behavior by setting your own proxy_cache_valid directive like in the [RandWord Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RandWord.pm).

```perl
spice proxy_cache_valid => "418 1d";
```

This is a special declaration that says don't cache. Actually it says cache only [418 HTTP](https://duckduckgo.com/?q=HTTP+418) return values for 1 day. Since regular return codes are [200](https://duckduckgo.com/?q=HTTP+200) and [304](https://duckduckgo.com/?q=HTTP+304), nothing will get cached.

If you wanted to say cache those normal values for 1h, you could do:

```perl
spice proxy_cache_valid => "200 304 1d";
```

## Advanced Spice Callbacks
In the [Spice callback functions](#spice-callback-functions) section we walked through a simple callback function used in the [Expatistan Spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/expatistan/spice.js). 

Here are some more advanced callback techniques you may need to use:

**Setting styles.** We use [YUI2](http://developer.yahoo.com/yui/2/), which is a JavaScript framework like JQuery. To set styles you can do:

```js
YAHOO.util.Dom.setStyle(obj,'margin-top','5px');
```

You can also use an id directly like:

```js
YAHOO.util.Dom.setStyle('id','margin-top','5px');
```

**Creating images.** We have an internal function for image creation called **nur**. In the [XKCD spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/xkcd/spice.js) it is used in this construct:

```js
       if (nur) img = nur('',xk['alt'],xk['img']);
       if (img) {
```

Ignore the first argument. The second is the alt text (title); third is img URL; fourth and fifth optional arguments are explicit height and width to use (in px).

**Big images.** If you have a big image that may be too big like in the [XKCD spice](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/share/spice/xkcd/spice.js), use the class **img_zero_click_big** that will resize it appropriately. 

You can add classes like this:

```js
YAHOO.util.Dom.addClass(img,'img_zero_click_big');
```

And again you can pass in an id directly like:

```js
YAHOO.util.Dom.addClass('id','img_zero_click_big');
```
