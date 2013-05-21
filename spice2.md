# Spice Frontend

## Overview
The spice frontend is the code that is triggered by the Perl backend that you wrote. It mainly consists of a function that takes an API response as its parameter. From this API response, you call a function that renders the data and specify which template format you'd like your data to have.

The Perl part of the plugins go in `lib/DDG/Spice/PluginName.pm`, while all of the files discussed below should go in `share/spice/plugin_name/`.

### Tech
The spice frontend uses [Handlebars](http://handlebarsjs.com) for templates and includes [jQuery](https://jquery.org) for use with JavaScript. Please don't abuse either of these :smile:

If you're not already familiar with Handlebars, *please* read the [Handlebars documentation](http://handlebarsjs.com) before continuing continuing on. Don't worry if you don't fully understand how to use Handlebars, the examples will explain but you should, at the very least, be familiarize yourself with Handlebars before moving on.

Also, if you are unfamiliar with jQuery 

Below, we will walk you through several examples ranging from simple to complicated, which will explain how to use the template system and make your plugins look awesome.


------------------------


## Example #1 - NPM (Basic Plugin)

The NPM plugin [[link](https://duckduckgo.com/?q=npm+uglify-js)] [[code](https://github.com/duckduckgo/zeroclickinfo-spice/tree/master/share/spice/npm)] is a great example of a basic Spice implementation. Let's walk through it line-by-line:

#####npm.js

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

`ddg_spice_npm()` is the function that the Perl module specifies -- it's the callback in the API response. This function will be called when the data returns from the upstream (API) provider.

	```javascript 
	if (api_result.error) return
	```
Pretty self-explanatory - If the error object in the API result is defined, then break out of the function and don't show any results. In the case of this API, when the error object is defined, it means no results are given, so we have no data to use for a spice result. 

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

Alright, so here is the bulk of the plugin, but it's very simple:

- `Spice.render()` is a function that the plugin system has already defined. You call it with a JSON object that specifies a bunch of important parameters. 

- `data` is perhaps the most important parameter. The object given here will be the object that is passed along to the Handlebars template. In this case, the context of the NPM template will be the **api_result** object. This is very important to understand because **only the data passed along to the template is accessible to the template**. In most cases the `data` parameter should be set to 
`api_result` so all the data returned from the API is accessible to the template. 

- `force_big_header` is related to the display formatting -- it forces the system to display the large grey header that you see when you click the example link above. 

- `header1` is the text of this header, i.e. the text displayed inside the large grey bar. 

- `source_name` is the name of the source for the "More at <source>" link that's displayed below the text of the plugin for attribution purposes. 

- `source_url` is the target of the "More at" link. It's the page that the user will click through to. 

- `template_normal` is the name of the Handlebars template that contains the structure information for your plugin. 

----

Now, let's look at the NPM plugin's Handlebars template:

######npm.handlebars

	```html
	<div id="npm_abstract">
	    <div id="npm_package_description">{{{description}}}</div>
	    <pre id="npm_install_command"> $ npm install {{{name}}}</pre>
	</div>
	```

As you can see, this is a special type of HTML template. Within the template, you can refer directly to objects that are returned by the API. `description` and `name` are both from the `api_result` object that we discussed earlier -- the data that's returned by the API. All of `api_result`'s sub-objects (e.g. `name`, `description`) are in the template's scope. You can access them by name within double or triple curly braces, which escape the contents. Here, we just create a basic HTML skeleton and fill it in with the proper information. The style for these HTML elements are defined in the npm css file.

**!!! DDG Base CSS Already Defines Styles for `<pre>` Tags !!!**
######npm.css

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

This CSS simply defines the styles for the `pre` tag with `id="npm_install_command"`, which we defined in `npm.handlebars`. This CSS gives that block its definitive grey background, etc. The `npm.css` file is automatically recognized by the plugin system. It's just critical that the name of the file is the same as the name of the plugin, just like the javascript file must be `npm.js` and the template must be `npm.handlebars`.

### Conclusion
We've created three files in the spice share directory (`share/spice/npm/`) :

1. `npm.js` - which delegates the API's response and calls `Spice.render()`
2. `npm.handlebars` - which specifies the plugin's HTML structure and determines which attributes of the API response are placed in the HTML result
3. `npm.css` - which outlines the style for the HTML defined in the template


## Example #2 - Alternative.To (Basic Carousel Plugin)
The Alternative.To plugin is very similar to NPM in that it is also relatively basic, however, it uses the new **Carousel** Spice Template. Let's take a look at the code and see how this is done:

######alternative_to.js
	```javascript
	function ddg_spice_alternative_to(api_result) {
	    Spice.render({
	        data           : api_result,
	        source_name    : 'AlternativeTo',
	        source_url     : api_result.Url,
	        template_normal: "alternative_to",
	        template_frame : "carousel",
	        carousel_template_detail: "alternative_to_details",
	        carousel_css_id: "alternative_to",
	        carousel_items : api_result.Items,
	    });
	}
	```
Just like the NPM plugin, Alternative.To uses `Spice.render()` with most of the same parameters, however, unlike NPM it uses a few new parameters as well:

- `template_frame` is used to tell the Render function that the base template for this plugin will be the **Carousel** template.  
***Note**: This is a template which we have already created and you don't have to worry about creating or modifying.*

- `carousel_template_detail` is an **optional** parameter which specifies the Handlebars template to be used for the Carousel ***detail*** area - the space below the template which appears after clicking a carousel item. For Alternative.To, when a user clicks a carousel item (icon), the detail area appears and provides more information about that particular item. This is similarly used for the [Quixey plugin](https://duckduckgo.com/?q=ios+flight+tracking+app).

- `carousel_css_id` is used to give an `id` to the inner wrapper `div` created by the carousel template. This must be used when any special CSS is written for a plugin using the carousel. It allows any plugin specific CSS to be namespaced eg. `#alternative_to li {…}`, which prevents plugins with custom CSS from interfering with other css that's already loaded.

- `carousel_items` is **required** when using the carousel template. It passes along an array or object to be iterated over by the carousel template. Each of these items becomes the context for the `alternative_to.handlebars` template which defines the content of each `<li>` in the carousel.

----------------------------

Now, let's take a look at the Alternative.To Handlebars templates:
######alternative_to.handlebars
	```html
	<li class="ddgc_item">
        <img src="/iu/?u={{IconUrl}}">
	    <span>{{{condense Name maxlen="25"}}}</span>
	</li>
	```
This simple template is used to define each of the carousel items. More specifically, it defines each `<li>` in the carousel and defines what the contents will be. In this case we specify an image - the result's icon - and a span tag, which contains the name of the result.

The carousel uses this template by iterating over each item in the object given to `carousel_items` and uses that item as the context of the template.

It's also important to note that the `<li>` has a `class` of `ddgc_item` which is used by our own Carousel CSS to style each item appropriately.

Another important point is that we use `{{{condense Name maxlen="25"}}}` which demonstrates the usage of a Handlebars helper function. In this case, we are using the `condense` function (defined elsewhere, internally) which takes two parameters: `Name` (from `api_result`), which is the string to be shortened and `maxlen="25"` which specifies the length the string will be shortened to. 

Seeing as this is a carousel plugin, which uses the optional carousel details area, it has another Handlebars template which defines the content for that.  Let's have a look at the Alternative.To details template:
######alternative_to_details.handlebars
    ```html
    <div>
        <div><b><a href="{{Url}}">{{Name}}</a></b> <span class="likes">({{Votes}} likes)</span></div>
        <div><i>Description:</i> {{{ShortDescription}}}</div>
        <div><i>Platforms:</i> {{#concat Platforms sep=", " conj=" and "}}{{this}}{{/concat}}</div>
    </div>
    ```
    
This template is also relatively simple. It creates a few `<div>` tags and populates them with relevant information related to the carousel item that was clicked. You'll notice the use of another Handlebars helper function, `concat`. This function takes an array as its first parameter and returns the elements of the array as a string, joined by the separator string (`sep=`) with the final element separated by the `conj=` string. In this case, if `Platforms` is a list of operating systems: `["windows", "linux", "mac"]`, then `concat` would return: **"widows, linux and mac"**.

Let's take a look at the Alternative.To CSS:

######alternative_to.css
	```css
	#alternative_to #ddgc_slides li {
		height: 60px !important;
	}
	
	#alternative_to #ddgc_slides p{
		height: 0px !important;
	}
	
	#alternative_to #ddgc_slides span {
		margin-top: 0px !important;
	}	
	```
	
This CSS is fairly straightforward, but the most important thing to notice here is that we've namespaced the css using `#alternative_to` and that we have used `!important` to over-ride the default carousel css.


##Example #3 - Movie (Advance Plugin)
The movie plugin is a much more involved plugin, but most of the logic is in a single Handlebars block helper function which is used for obtaining the most relevant result. Other than that, its relatively easy to understand. Lets start by looking at the Movie plugin's javascript:

######movie.js
    ```javascript
    var ddg_spice_movie = function(api_result) {
    
        Spice.render({
                data: api_result,
                source_name: 'Rotten Tomatoes',
                template_normal: "movie2",
                template_small: "movie_small"
                // source_url, image_url and header set in relevantMovie helper function below
            });
    };
    
This plugin has a very simple call to `Spice.render()`, but it slightly differs from other plugin because it not only defines `template_normal`, the default template to be used, but it also defines `template_small` which is the template to be used when this plugin is shown in a stacked state i.e., it is shown below another zero click result, but the content is minimal, preferably a single line of text.

Moving on, the bulk of this plugin can be found in the Handlebars helpers. Let's look at the `relevantMovie` function:
######movie.js (continued) - relevantMovie helper
    /*
        * relevantMovie
        *
        * a block helper that finds the best movie and applies
        * it to the enclosed template block.
        *
        * Sets the source_url, image_url, and header1 for the template
        * based on the best movie.
        *
        */
    Handlebars.registerHelper("relevantMovie", function(options) {
        console.log("handlebars helper: relevantMovie, this is:", this);
    
        var ignore = {movie:1, film:1, rotten:1, rating:1, rt:1, tomatoes:1};
        var result, max_score = 0;
    
        // assign a ranking value for the movie. this isn't a complete sorting value though
        // also we are blindling assuming these values exist
        var score = function(m) {
            var s = m.ratings.critics_score * m.ratings.audience_score;
            if (s > max_score) max_score = s;
            console.log("%d for %s", s, m.title);
            return s; // if any above are undefined, s is undefined
        };
    
        // returns the more relevant of the two movies
        var better = function(currentbest, next) {
            console.log("better: comparing %s", next.title);
    
            return (score(next) > score(currentbest) // if score() returns undefined, this is false, so we're still ok
                        && (next.year < currentbest.year)
                        && DDG.isRelevant(next.title, ignore)) ?
                    next : currentbest;
        };
    
        result = DDG_bestResult(this.movies, better);
    
        // favor the first result if the max score is within 1% of the score for the first result
        if (result !== this.movies[0] && Math.abs(score(this.movies[0]) - max_score) / max_score < 0.1) {
            result = this.movies[0];
        }
    
        // make the movie's info available to the zero click template
        // by setting spice value in the ddh (duckduckhack) object
    
        // this.ddh.relevantMovie = result;
        this.ddh.source_url = result.links.alternate;
        this.ddh.image_url = (result.posters.thumbnail || 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif');
        this.ddh.header1 = result.title + ' (' + result.year + ')';
    
        console.log("movie: setting image_url to '%s'", this.ddh.image_url);
    
        // invoke the body of the block with the relevant movie as the context
        return options.fn(result);
    });

As the comment explains, this function is a [Handlebars block helper](http://handlebarsjs.com/block_helpers.html) which we use to find the most relevant movie from the list of movies in our `api_result`. 

We define the function by using the `Handlebars.registerHelper()` method which takes two parameters: 

1. The name of the helper function we're creating (`"relevantMovie"` in this case)

2. The body of the function (which we then define inline)

An important concept to understand is that when a Handlebars block helper is invoked with no input, `this` (inside the function) refers to the **context** of the template *at the time the function is invoked* . In this case, we set the `data` parameter to `api_result` in `Spice.render()` so the context of the template is `api_result` when `relevantMovie()` is invoked. This means that inside `relevantMovie()`, `this === api_result`. However, we add a few keys to `api_result` that are needed for other functions, so `api_result` is actually slightly modified, but you can ignore this.

Understanding how this function chooses the most relevant movie isn't very important, however understanding the last line is **very** important:
   
    return options.fn(result);
    
Here, we are using the Handlebars function `options.fn()` which is a special function used specifically to change the context of the template, ***within the body of the block helper***, to the value of the function's input. So in this case, within `{{relevantMovie}} … {{/relevantMovie}}` the context of the template is equal to the `result` object created by `relevantMovie()`.


######movie.js (continued) - rating_adjective helper
    /*
        * rating_adjective
        *
        * help make the description of the movie gramatically correct
        * used in reference to the rating of the movie, as in
        *   'an' R rated movie, or
        *   'a'  PG rated movie
        */
    Handlebars.registerHelper("rating_adjective", function() {
            console.log("rating_adjective helper");
            return (this.mpaa_rating === "R"
                    || this.mpaa_rating === "NC-17"
                    || this.mpaa_rating === "Unrated") ?  "an" :"a";
    });
    
    
######movie.js (continued) - star_rating helper
    /* star rating */
    Handlebars.registerHelper("star_rating", function(obj, params) {
            console.log("rating_adjective helper");
    
    
            var r = (obj / 20) - 1;
            var s = "";
    
            console.log("rating %d --> %d", obj, r);
    
            if (r > 0) {
                for (var i=0; i<r; i++) {
    
                    s += "&#9733;";
                }
            }
    
            if (s.length == 0)
                s = "(0)";
    
            return s;
    });
    ```
