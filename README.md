DuckDuckHack Spicy
====
This documentation walks you through the process of writing a DuckDuckHack Spice plugin.
Before reading this section, make sure you've read the [DuckDuckHack Intro Site](http://duckduckhack.com) and the [DuckDuckHack Developer's Overview](https://github.com/duckduckgo/duckduckgo/blob/master/README.md). If you're here to brush up on Spice-related info, go ahead and scroll down. If you're here to learn how to write Spice plugins, head on over to the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview).

### Example
![quixey example](https://s3.amazonaws.com/ddg-assets/docs/spice_example.png)


Advanced Spice Development
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
