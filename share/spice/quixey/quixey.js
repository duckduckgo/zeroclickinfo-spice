(function(env) {
var quixey_image_domain = "d1z22zla46lb9g.cloudfront.net";

// spice callback function
env.ddg_spice_quixey = function(api_result) {

    if (!(api_result && api_result.results && api_result.results.length)) {
        return Spice.failed('apps');
    }

    var qLower = api_result.q.toLowerCase();

    var categories = [
        "action",
        "adventure",
        "arcade",
        "board",
        "business",
        "casino",
        // "calculator",
        "design",
        "developer tools",
        "dice",
        "education",
        "educational",
        "entertainment",
        "family",
        "finance",
        "fitness",
        "graphics and design",
        "graphics",
        "health and fitness",
        "health",
        "kids",
        "lifestyle",
        "map",
        "medical",
        "music",
        "navigation",
        "networking",
        "news",
        "photography",
        "productivity",
        "puzzle",
        "racing",
        "role playing",
        "simulation",
        "social networking",
        "social",
        "sports",
        "strategy",
        "travel",
        "trivia",
        "utilities",
        "video",
        "weather"
    ],

    // force startend to prevent categories
    // from doing silly stuff on queries like
    // 'yahoo news digest'
    category_alt_start = categories.join('|^'),
    category_alt_end = categories.join('$|'),
    category_trigger_regexp = new RegExp('^'+category_alt_start+'|'+category_alt_end+'$', 'i'),
    category_match_regexp = new RegExp(qLower.match(category_trigger_regexp), 'i');

    Spice.add({
        id: 'apps',
        name: 'Apps',

        data: api_result.results,

        meta: {
            // count is now computed by Spice
            // count: relevants.length,
            total: api_result.results.length,
            itemType: 'Apps',
            sourceName: 'Quixey',
            sourceUrl: 'https://www.quixey.com/search?q=' + encodeURIComponent(qLower),
            sourceLogo: {
                url: DDG.get_asset_path('quixey','quixey_logo.png'),
                width: '45',
                height: '12'
            }
        },

        normalize : function(item) {

            // relevancy pre-filter: skip ones that have less than three reviews
            if (item.rating_count && item.rating_count < 3) {
                return null;
            }

            // ignoring the case where rating_count is null

            var icon_url = make_icon_url(item), screenshot; 

            if (!icon_url)
                return null;

            screenshot = DDG.getProperty(item, 'editions.0.screenshots.0.image_url');

            if (!screenshot)
                return null;

            if (item.name && item.name.toLowerCase() === qLower) {
                item.exactMatch = true;
            } else if (item.developer && item.developer.name && item.developer.name.toLowerCase() === qLower) {
                item.boost = true;
            }

            return {
                'img':           icon_url,
                'title':         item.name,
                'heading':       item.name,
                'rating':        item.rating,
                'reviewCount':   DDG.getProperty(item, "editions.0.custom.features.allversions_rating_count") || DDG.getProperty(item, "editions.0.custom.features.rating_count"),
                'url_review':    item.dir_url,
                'price':         pricerange(item),
                'abstract':      item.short_desc || "",
                'brand':         (item.developer && item.developer.name) || "",
                'products_buy':  Spice.quixey.quixey_buy,

                // this should be the array of screenshots with captions
                // and check for the existence of them
                'img_m': quixey_image(screenshot)
            };
        },

        relevancy: {
            type: qLower.match(category_trigger_regexp) ? "category" : "primary",

            skip_words: [
                "android",
                "app",
                "apple app store",
                "apple app",
                "application",
                "applications",
                "apps",
                "best",
                "blackberry",
                "download",
                "downloaded",
                "droid",
                "enhanced",
                "free",
                "fully featured",
                "google play store",
                "google play",
                "ios",
                "ipad",
                "iphone",
                "ipod touch",
                "ipod",
                "most",
                "playbook",
                "popular",
                "release data",
                "release",
                "sale",
                "search",
                "windows mobile",
                "windows phone 8",
                "windows phone"
            ],

            category: [
                { required: 'icon_url' },
                { key: 'short_desc' },
                { key: 'name' },
                { key: 'custom.features.category', match: category_match_regexp, strict:false } // strict means this key has to contain a category phrase or we reject
            ],

            primary: [
                { required: 'icon_url' }, // would like to add  alt: 'platforms.0.icon_url'
                { key: 'name', strict: false },
            ],

            // field for de-duplication
            // currently single value, could be differentiated by type
            // eg { 'category': 'name', 'primary': 'id' }
            dup: 'name'

        },


        // sort field definition: how this data can be sorted. each field may appear in a UI drop-down.
        sort_fields: {
            'rating': //Spice.rating_comparator('rating', 'rating_count')
                function(a,b) {
                    var rank = function(r,count) {  // will be moved up
                        if (!count) count = 1;  // rating_count is sometimes null
                        return r*r*r*count/5;
                    };

                    // using normalized values
                    return rank(a.rating,a.reviewCount ) > rank(b.rating,b.reviewCount ) ? -1: 1;
                }
            // 'platform': function(a,b) { } ,
            // 'name':
            // 'price':
        },
        
        // default sorting- how the data will be initially arranged.
        // depends on the type of search. here only a 'category' search will
        // perform a default initial sort.
        // 'primary' is not here, meaning will remain in api_result order.
        // sort_default: { <sorttype>:<field>, <sorttype>:<field>, ... }
        sort_default: { 'category': 'rating' },

        template_group: 'products',

        templates: {
            options: {
                buy: Spice.quixey.buy,
                variant: 'narrow'
            }
        }

    });

}

// format a price
// p is expected to be a number
function qprice(p) {
    "use strict";

    if (p == 0) {    // == type coercion is ok here
        return "FREE";
    }

    return "$" + (p/100).toFixed(2).toString();
}

// template helper for price formatting
// {{price x}}
Handlebars.registerHelper("qprice", function(obj) {
    "use strict";

    return qprice(obj);
});


var quixey_image = function(image_url) {
    return "http://" + quixey_image_domain + image_url.match(/\/image\/.+/)[0];
}

var make_icon_url = function(item) {
    var domain = quixey_image_domain,
        icon_url = item.icon_url;

    if (!icon_url) {
        // console.warn("quixey: icon_url is null for %o", item);
        if (item.editions && item.editions[0].icon_url)
            icon_url = item.editions[0].icon_url;
        else
            return null;
    }

    // Get the image server that the icon_url in platforms is pointing to.
    // It's not ideal, but the link to the app's image still has to redirect
    // and it redirects to HTTPS. What we want is an HTTP link (for speed).
    if (item.platforms && item.platforms.length > 0 && item.platforms[0].icon_url) {
        domain = item.platforms[0].icon_url.match(/https?:\/\/([^\/]+)/)[1];
    }

    // Replace the domain in our icon_url to the one that we got from
    // the platforms array.
    // return "/iu/?u=http://" + domain + item.icon_url.match(/\/image\/.+/)[0] + "&f=1";
    return "http://" + domain + icon_url.match(/\/image\/.+/)[0];
};


// template helper to format a price range
var pricerange = function(item) {

    if (!item || !item.editions)
        return "";

    var low  = item.editions[0].cents;
    var high = item.editions[0].cents;
    var tmp, range, lowp, highp;

    for (var i in item.editions) {
        tmp = item.editions[i].cents;
        if (tmp < low) low = tmp;
        if (tmp > high) high = tmp;
    }

    lowp = qprice(low);

    if (high > low) {
       highp = qprice(high);
       range = lowp + " - " + highp;
       item.hasPricerange = true;
    } else {
        range = lowp;
    }

    return range;
};

Handlebars.registerHelper("pricerange", function() {
    return pricerange(this);
});

// template helper to replace iphone and ipod icons with
// smaller 'Apple' icons
Handlebars.registerHelper("platform_icon", function(icon_url) {
    "use strict";

    if (this.id === 2004 || this.id === 2015) {
        return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
    }

    // return "/iu/?u=" + icon_url + "&f=1";
    return icon_url;
});

// template helper that returns and unifies platform names
Handlebars.registerHelper("platform_name", function() {
    "use strict";

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

})(this);
