#Spice Frontend

##Overview
The Spice frontend is the code that is triggered by the Perl backend that you wrote. It mainly consists of a function that takes an API response as its parameter. From this API response, you call a function that renders the data and specifies which template format you'd like your data to have.

The Perl part of the plugins go in `lib/DDG/Spice/PluginName.pm`, while all of the files discussed below should go in `share/spice/plugin_name/`.

###Tech
The spice frontend uses [Handlebars](http://handlebarsjs.com) for templates and includes [jQuery](https://jquery.org) for use with JavaScript.

If you're not already familiar with Handlebars, *please* read the [Handlebars documentation](http://handlebarsjs.com) before continuing continuing on. Don't worry if you don't fully understand how to use Handlebars, the examples will explain but you should, at the very least, be familiarize yourself with Handlebars before moving on.

Also, if you are unfamiliar with jQuery, you can familiarize yourself with that if you'd like, but jQuery is not required to write a spice plugin.

Below, we will walk you through several examples ranging from simple to complicated, which will explain how to use the template system and make your plugins look awesome.


------------------------


##Example #1 - NPM (Basic Plugin)

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

###Conclusion
We've created three files in the spice share directory (`share/spice/npm/`) :

1. `npm.js` - which delegates the API's response and calls `Spice.render()`
2. `npm.handlebars` - which specifies the plugin's HTML structure and determines which attributes of the API response are placed in the HTML result
3. `npm.css` - which outlines the style for the HTML defined in the template


##Example #2 - Alternative.To (Basic Carousel Plugin)
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

You might notice that we prepend the `<img>`'s `src` url with the string `"/iu/?u="`. This is **required** for any images in your handlebars template. What this line does is proxy the image through our own servers, which ensure the user's privacy (because it force the request to come from DuckDuckGo instead of the user).

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
    
This template is also relatively simple. It creates a few `<div>` tags and populates them with relevant information related to the carousel item that was clicked. You'll notice the use of another Handlebars helper function, `concat`. This function takes an array as its first parameter and iterates over each element in the array. For each iteration, `{{#concat}}` sets the context of the block equal to the current array element and then concatenates the content of its block, joining each by the separator string (`sep=`) with the final element separated by the `conj=` string. In this case, if `Platforms` is a list of operating systems: `["windows", "linux", "mac"]`, then `concat` would return: **"widows, linux and mac"**.

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
The movie plugin is a more advanced than **NPM** and **Alternative.To**, but most of the logic is in a single function which is used to obtain the most relevant movie from list given to us in `api_result`. Other than that, its relatively easy to understand, so lets start by looking at the Movie plugin's javascript:

######movie.js
```javascript
var ddg_spice_movie = function(api_result) {

    Spice.render({
            data: api_result,
            source_name: 'Rotten Tomatoes',
            template_normal: "movie_alt",
            template_small: "movie_small"                
            // source_url, image_url and header set in relevantMovie helper function below
        });
};    
```
    
This plugin has a very simple call to `Spice.render()`, but it slightly differs from other plugin because it not only defines `template_normal`, the default template to be used, but it also defines `template_small` which is the template to be used when this plugin is shown in a stacked state i.e., it is shown below another zero click result, but the content is minimal, preferably a single line of text.

Before looking at the implementation of the Handlebars helper functions lets first take a look at the Movie spice's Handlebars template to see how the helper functions are used:

######movie.handlebars
```html
{{#relevantMovie}}

    <div id="movie_data_box">
    
        <div>
            <span class="movie_data_item">
                <span class="movie_star_rating">{{{star_rating ratings.critics_score}}}</span>
            </span>
            <span class="movie_critics_rating">{{ratings.critics_rating}}</span>
            <div class="movie_data_description">
            ({{ratings.critics_score}}% critics,
             {{ratings.audience_score}}% audience approved)
            </div>
        </div>
    
        <div><span class="movie_data_item">MPAA rating:</span>{{mpaa_rating}}</div>
        <div><span class="movie_data_item">Running time:</span>{{runtime}} minutes</div>
        <div><span class="movie_data_item">Starring:</span>
            {{#concat abridged_cast sep=", " conj=" and "}}<a href="http://www.rottentomatoes.com/celebrity/{{id}}/">{{name}}</a>{{/concat}}.
        </div>
    </div>
    
    {{#if synopsis}}
        {{synopsis}}
    {{else}}
        {{condense critics_consensus maxlen="200"}}
    {{/if}}

{{/relevantMovie}}
```

The first line of the template demonstrates the use of a [Handlebars block helper](http://handlebarsjs.com/block_helpers.html), `{{#relevantMovie}}` which is defined in **movie.js**. This block helper is important because it sets the context for the rest of the template. In this case we use `{{#relevantMovie}}` to find the most relevant movie from the list of movies in our `api_result`, and then using that single movie object as the context, we use the rest of the template to reference the various properties of the movie and build a result.  

It's important you understand this concept: outside of the block helper, the context of the template is equal to `api_result`, however, inside the `{{#relevantMovie}}` helper, the context of the template is explicitly set to be the return value of the `{{#relevantMovie}}`. Before looking at the rest of the Handlebars template, let's look at the implementation of `{{#relevantMovie}}`:

######movie.js (continued) - relevantMovie helper
```javascript
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
```

We define the function by using the `Handlebars.registerHelper()` method which takes two parameters: 

1. The name of the helper function we're creating (`"relevantMovie"` in this case)

2. The body of the function (which we then define inline)

***\*\*Note:*** when a Handlebars block helper is invoked with no input, `this` (inside the function) refers to the **context** of the template *at the time the function is invoked* . In this case, we set the `data` parameter to `api_result` in `Spice.render()` so the context of the template is `api_result` when `relevantMovie()` is invoked. This means that inside `relevantMovie()`, `this === api_result`. However, we add a few keys to `api_result` that are needed for other functions, so `api_result` is actually slightly modified, but you can ignore this.

```javascript   
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
```
A fairly simple function which calculates a score for a given movie based on the combined critics score and audience score. It also keeps track of the highest score so far.
    
```javascript
    // returns the more relevant of the two movies
    var better = function(currentbest, next) {
        console.log("better: comparing %s", next.title);

        return (score(next) > score(currentbest) // if score() returns undefined, this is false, so we're still ok
                    && (next.year < currentbest.year)
                    && DDG.isRelevant(next.title, ignore)) ?
                next : currentbest;
    };
```
As the comment explains, this function simply compares the score of two movies and returns the higher scoring movie. However, it is important to mention the use of the function `DDG.isRelevant()`. This is a special internal function which compares the input string to the current search query (i.e., the one that triggered this plugin), to see how relevant the string is with respect to the words in the query. `DDG.isRelevant()` also takes an **optional** second parameter which is an object containing sets of keys with a value of 1. The keys of this object, defined by the developer, will explicitly be ignored when comparing the query string against the candidate string. In our case we are comparing the title of the movie we are currently considering, `next.title`, against the search query and we explicitly ignore a set of words - mostly trigger words for the plugin - as defined above: `var ignore = {movie:1, film:1, rotten:1, rating:1, rt:1, tomatoes:1};`.

```javascript
    result = DDG_bestResult(this.movies, better);

    // favor the first result if the max score is within 1% of the score for the first result
    if (result !== this.movies[0] && Math.abs(score(this.movies[0]) - max_score) / max_score < 0.1) {
        result = this.movies[0];
    }
```
    
Now that we have our functions defined, we use them to find the most relevant movie. In order to do so, we use the function `DDG_bestResult()` which is another internal function that takes two parameters, a list and a comparison function. In our case we use `DDG_bestResult()` to iterate over our the list of movies, `this.movies` using the function `better()` which we defined above.
    
```javascript
    // make the movie's info available to the zero click template
    // by setting spice value in the ddh (duckduckhack) object

    // this.ddh.relevantMovie = result;
    this.ddh.source_url = result.links.alternate;
    this.ddh.image_url = (result.posters.thumbnail || 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif');
    this.ddh.header1 = result.title + ' (' + result.year + ')';

    console.log("movie: setting image_url to '%s'", this.ddh.image_url);
```
Now that we have selected our most relevant result, we use it to set the values of the Zero Click Box Header, Source URL and Image URL. As previously mentioned, we slightly modify `api_result` when we set it as the context of the template. What we actually do is append the `ddh` object to `api_result`, which lets us modify the properties of `Spice.render()`.

```javascript
    // invoke the body of the block with the relevant movie as the context
    return options.fn(result);
});
```
This last line is **very** important. Here, we are using the Handlebars function `options.fn()` which is a special function used specifically to change the context of the template, ***within the body of the block helper***, to the value of the function's input. So in this case, within `{{relevantMovie}} … {{/relevantMovie}}` the context of the template is equal to the `result` object created by `relevantMovie()` which allows us to reference the properties of the `result` object, in our Handlebars template. With that in mind, lets move on and see the rest of the **Movie.handlebars**:

######movie.handlebars (again...)
```html
{{#relevantMovie}}

    <div id="movie_data_box">
    
        <div>
            <span class="movie_data_item">
                <span class="movie_star_rating">{{{star_rating ratings.critics_score}}}</span>
            </span>
            <span class="movie_critics_rating">{{ratings.critics_rating}}</span>
            <div class="movie_data_description">
            ({{ratings.critics_score}}% critics,
             {{ratings.audience_score}}% audience approved)
            </div>
        </div>
    
        <div><span class="movie_data_item">MPAA rating:</span>{{mpaa_rating}}</div>
        <div><span class="movie_data_item">Running time:</span>{{runtime}} minutes</div>
        <div><span class="movie_data_item">Starring:</span>
            {{#concat abridged_cast sep=", " conj=" and "}}<a href="http://www.rottentomatoes.com/celebrity/{{id}}/">{{name}}</a>{{/concat}}.
        </div>
    </div>
    
    {{#if synopsis}}
        {{synopsis}}
    {{else}}
        {{condense critics_consensus maxlen="200"}}
    {{/if}}

{{/relevantMovie}}
```

Inside the `{{relevantMovie}}` block helper, the template is pretty simple - we create a few `div`'s and reference properties of the context just like we did in **NPM** and **Alternative.To**. We also use a few more Handlebars helper functions, `star_rating` which we define in **movie.js**, `concat` and `condense`, which we've already discussed and another block helper, `{{#if}}` (a default Handlebars helper) which should be self-explanatory. We use the `{{if}}` helper to check if a variable exists in the current context. However, this block helper, unlike `{{#relevantMovie}}` ***doesn't*** change the context of the template inside its block.

Moving on, let's take a look at the implementation of `star_rating`:
    
######movie.js (continued) - star_rating helper

```javascript
// star rating
Handlebars.registerHelper("star_rating", function(score) {
    console.log("rating_adjective helper");

    var r = (score / 20) - 1;
    var s = "";

    if (r > 0) {
        for (var i=0; i < r; i++) {
            s += '&#9733;';
        }
    }

    if (s.length == 0)
        s = '(0)';

    return s;
});
```

As you can see this is a pretty simple function, it takes a number as input, and use that to calculate a star rating. Then creates a string of ASCII stars and returns it to the template which will then be rendered by the browser to show a star rating of the movie.  

Now that you've seen a more advanced plugin and understand how to use Handlebars helpers, lets look at another advanced plugin example.

##Example #4 - Quixey (Advance Carousel Plugin)
The Quixey plugin is one of our more advanced carousel plugins which uses a considerable amount of Handlebars helpers and similarly to the **Movie** plugin has a relevancy checking component. Let's begin by taking a look at the Quixey plugin's Javascript:

######quixey.js
```javascript
function ddg_spice_quixey (api_result) {

    if (api_result.result_count == 0) return;

    var q = api_result.q.replace(/\s/g, '+');

    Spice.render({
        data: api_result,
        source_name: 'Quixey',
        source_url: 'https://www.quixey.com/search?q=' + q,
        header1: api_result.q + ' (App Search)',
        force_big_header: true,
        more_logo: "quixey_logo.png",
        template_frame: "carousel",
        template_normal: "quixey",
        carousel_css_id: "quixey",  
        carousel_template_detail: "quixey_detail",
```

Similarly to **Alternative.To**, the Quixey plugin uses the carousel, and sets values for all the required carousel-specific properties. However, this plugin also uses the `force_big_header` property to create a ZeroClick header and subsquently sets the value of the header text, `header1`. Also, the `more_logo` property is set, which allows a custom image to be used instead of the `source_name` text. One important difference about Quixey is the use of our own `organize()` Handlebars helper in `Spice.render()`:

######quixey.js (continued)
```javascript
        carousel_items: Handlebars.helpers.organize(api_result.results)
    });
}
```

Here we are using `organize()` (defined below in **Quixey.js**) in our *Javascript* rather than inside our Handlebars template. We are able to do this using the `Handlebars.helpers` object which contains all the helpers we have defined, as well as the helpers defined by our own core Spice code and those that are native to Handlebars. Unlike the **Movie** plugin, we are required to use our block helper in this manner (i.e., outside the template) so that only the results we want included in the carousel are passed on to the **quixey.handlebars** template.

Moving on, let's take a look at the implementation of the `organize()` helper:

######quixey.js (continued) - organize helper
```javascript
// Check for relevant app results
Handlebars.registerHelper("organize", function(results) {
        
    var res,
        apps = [],
        backupApps = [],
        categories = /action|adventure|arcade|board|business|casino|design|developer tools|dice|education|educational|entertainment|family|finance|graphics|graphics and design|health and fitness|kids|lifestyle|medical|music|networking|news|photography|productivity|puzzle|racing|role playing|simulation|social networking|social|sports|strategy|travel|trivia|utilities|video|weather/i,
        skip_words = {"app": 1, "apps": 1, "application": 1, "applications": 1, "android": 1, "droid": 1, "google play store": 1, "google play": 1, "windows phone": 1, "windows phone 8": 1, "windows mobile": 1, "blackberry": 1, "apple app store": 1, "apple app": 1, "ipod touch": 1, "ipod": 1, "iphone": 1, "ipad": 1, "ios": 1, "free": 1, "search": 1};
        
    for (var i = 0; i < results.length; i++) {

        app = results[i];

        // check if this app result is relevant
        if (DDG.isRelevant(app.name.toLowerCase(), skip_words)) {
            apps.push(app);
        } else if (app.hasOwnProperty("short_desc") &&
                   DDG.isRelevant(app.short_desc.toLowerCase(), skip_words)) {
                        backupApps.push(app);
        } else if (app.custom.hasOwnProperty("category") &&
                   DDG.isRelevant(app.custom.category.toLowerCase(), skip_words)) {
                        backupApps.push(app);
        } else{
            continue;
        }
    }

    // Return highly relevant results
    if (apps.length > 0) {
        res = apps;
    }

    // Return mostly relevant results
    else if (backupApps.length > 0) {
        res = backupApps;
    }

    else {
        // No relevant results,
        // check if it was a categorical search
        // Eg."social apps for android"
        var q = DDG.get_query();
        res = q.match(categories) ? results : null;
    }
    return res;
});
```

We begin by defining the function and its input, `results` which is an array of apps. Then we define some variables, notable we define `skip_words`, which we will use later for a call to the `isRelevant()` function we discussed earlier. Then, we move onto a `for` loop which does the bulk of the work by iterating over ever app in the `results` array and applies a series of `isRelevant()` checks to see if either the app name, short description or category are relevant to the search query. If the name is considered to be relevant we add it to the `apps` array which contains all the relevant app results. If the name isn't relevant but the description or category is, we add it to the `backupApps` array, because we might need them later. If none of those properties are considered relevant we simply exclude that app from the set of apps that will be displayed to the user.

After we've checked every app we check to see if there were any relevant apps and if so, we show them to the user. Otherwise, we check our `backupApps` array to see if there were any apps who might be relevant and show those to the user. Failing that, we check if the search was for an app category and if so, we return all the results because the Quixey API is assumed to have relevant results. 

Before looking at the implementation of the remaining Quixey Handlebars helpers, lets look at the template to see how the helpers are used:

######quixey.handlebars
```html
<li class="ddgc_item"> {{! width set in setup() }}
    <p><img src="{{{icon_url}}}" /></p>
    <span>{{{condense name maxlen="40"}}}</span>
</li>
```

This template is very simple, it creates an `<li>` with an `<img>` tag, for the resulting app icon and a `<span>` tag for the app name. You may also notice that unlilke **Alternative.To**, we placed the `<img>` tag inside `<p>` tags. We do this to automatically center and align the images, through the use of carousel specific CSS that we wrote, because the images aren't all the same size and would otherwise be missalligned. So, if the images for your plugin aren't the same size, simply wrap them in `<p>` tags and the carousel will take care of the rest. If not, simply ignore the use of the `<p>` tags.

Now let's take a look at the Quixey `carousel_template_detail` template. This template is more advanced, but most of the content is basic HTML which is populated by various `api_result` properties and Handlebars helpers:

######quixey_detail.handlebars (continued)
```html
<div id="quixey_preview" style="width: 100%; height: 100%;" app="{{id}}">
    <div class="app_info">
        <a href="{{{url}}}" class="app_icon_anchor">
            <img src="{{{icon_url}}}" class="app_icon">
        </a>
        <div class="name_wrap">
            <a href="{{url}}" class="name" title="{{name}}">{{name}}</a>
```

Here we create the outer div that wraps the content in the detail area. Note the use of HTML ids and classes - this is to make the css more straightforward, modular and understandable.

######quixey_detail.handlebars (continued)
```html
            {{#if rating}}
                <div title="{{rating}}" class="rating">
                    {{#loop rating}}
                        <img src="{{quixey_star}}" class="star"></span>
                    {{/loop}}
                </div>
            {{/if}}
```

Here we use the `{{#if}}` block helper and nested inside that, we use our own `{{#loop}}` block helper (defined internally), which simply counts from 0 to the value of its input, each time applying the content of its own block. In this example, we use it to create a one or more star images to represent the app's rating.
 
######quixey_detail.handlebars (continued) 
```html
            <div class="price">{{pricerange}}</div>
            <div class="app_description">{{{short_desc}}}</div>
            <div id="details_{{id}}" class="app_details">
                <div class="app_editions">
                    {{#each editions}}
                        <div class="app_edition" title="{{name}} - Rating: {{rating}}">
                            <a href="{{{url}}}" class="app_platform">
                                {{#with this.platforms.[0]}}
                                <img src="{{platform_icon icon_url}}" class="platform_icon">
                                {{/with}}
                                {{platform_name}}
                                {{#if ../hasPricerange}}
                                     - {{price cents}}
                                {{/if}}
                            </a>
                        </div>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
```

Here, we create a few more `<div>`'s and then we use another block helper, `{{#each}}`, which takes an array as input, and iterates over each of the array's elements, using them as the context for the `{{#each}}` block. Nested within the `{{#each}]` helper, we also use the `#{{with}}` block helper, which takes a single object as input, and applies that object as the context for its block. One more interesting thing to note is the input we give to the `{{#if}}` block nested in our `{{#each}}` block. We use the `../` to reference the parent template's context.  

Now that we've seen the template and the helpers we're using, let's take a look at how they're all implemented:

######quixey.js (continued) -  qprice function
```javascript
// format a price
// p is expected to be a number
function qprice(p) {
    if (p == 0) {    // == type coercion is ok here
        return "FREE";
    }
    
    return "$" + (p/100).toFixed(2).toString();
}
```

This is a simple function that formats a price. We don't register it as a helper because we don't need to use this function directly in our templates, however our helper functions do use this function `qprice()` function.

######quixey.js (continued) -  price helper
```javascript
// template helper for price formatting
// {{price x}}
Handlebars.registerHelper("price", function(obj) {
    return qprice(obj);
});
```

This helper function is relatively simple, it takes a number as input, calls the `qprice()` function we just saw, and returns it's output to the template. It essentially abstracts our `qprice()` function into a Handlebars helper. We do this because the next function we'll see also uses `qprice()` and its simply easier to call it as a locally defined function, rather than register it as a helper and then use the `Handlebars.helpers` object to call the `qprice()` function.

######quixey.js (continued) -  pricerange helper
```javascript
// template helper to format a price range
Handlebars.registerHelper("pricerange", function(obj) {
   
    if (!this.editions)
        return "";

    var low  = this.editions[0].cents;
    var high = this.editions[0].cents;
    var tmp, range, lowp, highp;

    for (var i in this.editions) {
        tmp = this.editions[i].cents;
        if (tmp < low) low = tmp;
        if (tmp > high) high = tmp;
    }

    lowp = qprice(low);

    if (high > low) {
       highp = qprice(high);
       range = lowp + " - " + highp;
       this.hasPricerange = true;
    } else {
        range = lowp;
    }
   
    return range;
});
```

This function is a little more complex, it takes an object as input, iterates over the objects keys, and records the highest and lowest prices for the app. Then, it verifies that the range has different high and low values. If not, it simply returns the low price, formatted using our `qprice()` function. Otherwise, it creates a string indicating the range and formats the values with `qprice()`.

######quixey.js (continued) -  platform_icons helper
```javascript
// template helper to replace iphone and ipod icons with
// smaller 'Apple' icons
Handlebars.registerHelper("platform_icon", function(icon_url) {
    if (this.id === 2004 || this.id === 2015) {
        return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
    }

    return "/iu/?u=" + icon_url + "&f=1";
});
```

Another very simple helper function, the `platform_icon()` function simply checks if its input is equal to `2005` or `2015` and if so returns a special url for the platform icon. If not, it returns the originial icon url but adds our proxy redirect, `/iu/?u=` as previously discussed.

######quixey.js (continued) -  platform_name helper
```javascript
// template helper that returns and unifies platform names
Handlebars.registerHelper("platform_name", function() {
    var name;
    var platforms = this.platforms;

    name = platforms[0].name;

    if (platforms.length > 1) {
        switch (platforms[0].name) {
            case "iPhone" :
            case "iPad" :
                name = "iOS";
                break;

            case "Blackberry":
            case "Blackberry 10":
                name = "Blackberry";
                break;
        }
    }

    return name;
});
```

This helper is also quite simple, it is used to return a platform name and someties also unifies the platform name when multiple platforms exist for an app. If the app is available for both 'iPhone' and 'iPad', the `switch()` will catch this and indicate the app is availabe for "iOS".

######quixey.js (continued) -  quixey_star helper
```javascript
// template helper to give url for star icon
Handlebars.registerHelper("quixey_star", function() {
    return DDG.get_asset_path("quixey", "star.png").replace("//", "/");
});
```

This helper is also very simple, but it is important because it uses the `DDG.get_asset_path()` function which returns the URI for an asset stored in a plugin's share folder. This is necessary because spice plugins and their content are versioned internally. So the URI returned by this function will contain the proper version number, which is required to access any assets.

##Example #5 - Dictionary (More Advanced Plugin)
The dictionary plugin is a more advanced plugin than the previous examples, because it requires multiple endpoints (which means it has multiple perl modules -`.pm` files) in order to function properly. You will notice it has its own directory in the the Spice repository: `zeroclickinfo-spice/share/spice/dictionary/definition/`

Each plugin we've seen so far has had one perl module, which had a matching folder in the `zeroclickinfo-spice/share/spice/share/` directory. For this plugin, each module is a seperate folder contained with the `zeroclickinfo-spice/share/spice/share/dictionary` directory which allows each module to use their own Javascript, Handlebars and CSS files. In the case of the **Dictionary** plugin these various endpoints work together as a single plugin. However, other plugins such as [**Last.FM**](https://github.com/duckduckgo/zeroclickinfo-spice/tree/spice2/share/spice/lastfm) are able to have multiple endpoints which are independant and react to different queries and each have different results.

---

##Advanced Techniques

###Slurping a Textfile (when you have a *lot* of trigger words...)
(tbd)

###Using API Keys
(tbd)

###Using the GEO Location API
(tbd)

###Common Code for Spice Endpoints (.pm's)
(tbd)

###Common Javascript and Handlebars Templates
(tbd)

------

##Common Pitfalls

###Defining Perl Variables and Functions
(tbd)

------

##StyleGuide
(overview - tbd)

###Formatting
(overview - tbd)

####Consistant Variable Names
ex. "api_return"

####Spice Header Format
`<search term>` (<Source>)

####No bolded text in spice body
(tbd)

####No "undefined" values in spice body
(tbd)

####Indent with spaces (not tabs)
(tbd)

------

###Naming Conventions
- Folder hierarchy (Also follows Perl naming convention)

###Do's & Don'ts

####Proxy Images & Audio
/iu/
- Requires a standard image format extension!

####Add extra attribution
"More at" link should be enough

------

##FAQ

###I want to use this API but it doesn't have an endpoint for X. What should I do?
Email them! - If you explain what its for, they might be willing to create and endpoint for you!

###Can I use an API that returns XML?
Sorry but no. We currently don't support XML. We're considering it though...

###Can I use an API that returns HTML? (or just a string)
If the response is a single string, then yes - you can use `zci wrap_jsonp_callback`. You can read more about that [here](#). Or take a look at the [Automeme](https://github.com/duckduckgo/zeroclickinfo-spice/blob/spice2/lib/DDG/Spice/Automeme.pm#L8) plugin.

If the response is more complicated, then sorry but **no**.

###Can I move the carousel detail are above the carousel?
Yup - See the Khan Academy Spice!

###Can I add this JS library?
Probably not. Maybe if it is very small. But only you should ask us first before writing a plugin that is dependant on another library. We prefer no third party libraries are used.

###Can I use Coffeescript?
No.

###What about...
No.

------

##DDG Methods (DuckDuck.js) 

###DDG.get_query()
(tbd)

###DDG.get_query_raw()
(tbd)

------

##Spice Handlebars Block Helpers
\#concat
\#loop

-------

##Spice Attributes

###Spice to
(tbd)

###Spice from
(tbd)

###Spice wrap_jsonp_callback
(tbd)

###Spice proxy_cache_valid 
(tbd)

###Spice is_unsafe