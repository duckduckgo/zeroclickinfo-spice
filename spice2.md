# Spice Frontend

## Overview
The spice frontend is the code that is triggered by the Perl backend that you wrote. It mainly consists of a function that takes an API response as its parameter. From this API response, you call a function that renders the data and specify which template format you'd like your data to have.

The Perl part of the plugins go in ```lib/DDG/Spice/PluginName.pm```, while all of the files discussed below go should go in ```share/spice/plugin_name/```.

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
Pretty self-explanatory. Bail out if the error object in the API result is defined.

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

```data``` is just what it sounds like. It's the data returned by the API, and this parameter should almost always be set to ```api_result```. 

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

So this is an HTML template. Within the template, you can refer directly to objects that are returned by the API. ```description``` and ```name``` are both from the ```api_result``` object that we discussed earlier -- the data that's returned by the API. All of ```api_result```'s sub-objects (like ```name``` and ```description```) are in the template's scope. You can access them by name within the triple curly brackets. Here, we just create a basic HTML skeleton and fill it in with the proper information. The style for these HTML objects are defined in ```npm.css``.


```css
#npm_install_command {
    background-color: #eee;
    color: #333;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    margin-bottom: 5px;
    padding: 5px;
    margin-right: 10px;
    word-wrap: break-word;
    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
}
```

All we're doing here is defining the styling for the pre with id ```npm_install_command```, which we defined in ```npm.handlebars```. This CSS file gives that block its definitive grey background, etc. The ```npm.css``` file is automatically recognized by the plugin system. It's just critical that the name of the file is the same as the name of the plugin, just like the javascript file must be ```npm.js``` and the template must be ```npm.handlebars```.

### Conclusion
We've created three files in ```share/spice/npm/```: ```npm.js```, which delegates the API's response and calls ```Spice.render```, ```npm.handlebars```, which specifies the plugin's HTML structure and determines which attributes of the API response fit in what places, and ```npm.css```, which outlines the style for the HTML in the template file.