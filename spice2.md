# Spice Frontend

## Overview
The spice frontend is the code that is triggered by the Perl backend that you wrote. It mainly consists of a function that takes an API response as its parameter. From this API response, you call a function that renders the data and specify which template format you'd like your data to have.

The Perl part of the plugins go in ```lib/DDG/Spice/PluginName.pm```, while all of the files discussed below go should go in ```share/spice/plugin_name/```.

The [Examples](#basic-plugin) section below is a good introduction to frontend spice developement. For information on how to develop the Perl (backend, triggering) part of a plugin, please see the [Spice Overview](https://github.com/duckduckgo/duckduckgo#spice-overview). The examples walk through progressively complicated plugins line-by-line.

### Keep in mind
The idea behind spice plugins is that the front end and back end code are clearly separate. There is a further distinction between form and function on the frontend that will become apparent in the examples below. The appearance of a plugin should be defined in a way such that it can be altered without needing to touch any javascript code. The same is true of the function of the plugin and the plugin's css. The two should be independent.

### Tech
The spice frontend uses [Handlebars](http://handlebarsjs.com) for templates and [jQuery](https://jquery.org) for JavaScript. Please don't abuse either of these :smile: Below, we walk you through several examples that explain how to use the template system and make your plugin look awesome.

---

## Basic Plugin

The npm plugin [[link](https://duckduckgo.com/?q=npm+uglify-js)] [[code](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/share/spice/npm)] is a great example of a basic spice implementation. Let's walk through it line-by-line.

```javascript
var ddg_spice_npm = function(api_result) {
	if (api_result.error) return

    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : api_result.name + ' (' + api_result.version + ')',
         source_name       : "npmjs.org", // More at ...
         source_url        : 'http://npmjs.org/package/' + api_result.name,
         template_normal   : 'npm',
         template_small    : 'npm'
    });
}
```

```ddg_spice_npm()``` is the function that the Perl plugin specifies -- it's the callback in the API response. This function will be called when the data returns from the upstream provider. 

```javascript 
if (api_result.error) return
```
Bail out if the error object in the API result is defined. Note that ```error``` is not a standard object -- the object name is specific to npmjs.org's API.

```javascript
    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : api_result.name + ' (' + api_result.version + ')',
         source_name       : "npmjs.org", // More at ...
         source_url        : 'http://npmjs.org/package/' + api_result.name,
         template_normal   : 'npm',
         template_small    : 'npm'
    });
```

Ok, so this is the meat of the plugin, but it's very simple. Spice.render() is a function that the plugin system has already defined. You call it with a JSON object that specifies a bunch of important parameters. 

```data``` is just what it sounds like. It's the data returned by the API. This parameter should almost always be set to ```api_result```. 

```force_big_header``` is a formatting thing -- it forces the system to display the large grey header that you see when you click the example link above. 

```header1``` is the text of this header, i.e. the text displayed inside the large grey bar. 

```source_name``` is the "More at" link that's displayed below the text of the plugin for attribution. 

```source_url``` is the target of the "More at" link. It's the page that the user will click through to. 

Finally, ```template_normal``` is the name of the Handlebars template that contains the structure information for your plugin. 

Let's check out ```npm.handlebars```.

```html
<div id="npm_abstract">
    <div id="npm_package_description">{{{description}}}</div>
    <pre id="npm_install_command"> $ npm install {{{name}}}</pre>
</div>
```

So this is an HTML template. Within the template, you can refer directly to objects that are returned by the API. ```description``` and ```name``` are both from the ```api_result``` object that we discussed earlier -- the data that's returned by the API. All of ```api_result```'s sub-objects (like ```name``` and ```description```) are in the template's scope. You can access them by name within the triple curly brackets. Here, we just create a basic HTML skeleton and fill it in with the proper information. The style for these HTML objects is defined in ```npm.css``.


```css
#npm_install_command {
    background-color: #eee;
    color: #333;
	<other stuff>
}
```

All we're doing here is defining the styling for the pre tag with id ```npm_install_command```, which we defined in ```npm.handlebars```. This CSS file gives that block its definitive grey background, etc. The ```npm.css``` file is automatically recognized by the plugin system. ***IMPORTANT***: It's critical that the name of the file is the same as the name of the plugin, just like the javascript file must be ```npm.js``` and the template must be ```npm.handlebars```.

### Conclusion
We've created three files in ```share/spice/npm/```: ```npm.js```, which delegates the API's response and calls ```Spice.render```, ```npm.handlebars```, which specifies the plugin's HTML structure and determines which attributes of the API response fit in what places, and ```npm.css```, which outlines the style for the HTML in the template file. These are the only three files you need to make a basic plugin. You can even exclude the css file if your plugin doesn't require any specific styling information.

## Intermediate Plugin
The AlternativeTo plugin [[link](https://duckduckgo.com/?q=alternative+to+google)] [[code](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/share/spice/alternative_to)] is an intermediate plugin that's a bit more involved than the basic npm example. It uses a ***carousel*** implementation, as do several other plugins. The carousel is the stock spice template for displaying multiple data items, e.g. in the Yummly plugin to show multiple recipes and here in the AlternativeTo plugin to show multiple software projects.
