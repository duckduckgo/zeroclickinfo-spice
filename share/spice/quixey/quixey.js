(function(env) {
var quixey_image_domain = "d1z22zla46lb9g.cloudfront.net";

// spice callback function
env.ddg_spice_quixey = function(api_result) {

    var q = api_result.q.replace(/\s/g, '+');

    var category_regexp = new RegExp([
            "action",
            "adventure",
            "arcade",
            "board",
            "business",
            "casino",
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
            "health",
            "health and fitness",
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
        ].join("|"), "i");

    Spice.add({
        id: 'quixey',
        name: 'Apps',

        data: api_result.results,   //relevants,

        meta: {
            // count is now computed by Spice
            // count: relevants.length,
            total: api_result.results.length,
            itemType: 'Apps',
            sourceName: 'Quixey',
            sourceUrl: 'https://www.quixey.com/search?q=' + q,
            sourceIconUrl: DDG.get_asset_path('quixey','quixey_logo.png')
        },

        normalize : function(item) {

            // relevancy pre-filter: skip ones that have less than three reviews
            if (!item.rating_count || item.rating_count < 3)
                return null;

            return {
                'img':           make_icon_url(item), 
                'title':         item.name,
                'heading':       item.name,
                'ratingData':    {
                                   stars: item.rating,
                                   reviews: item.rating_count
                               },
                'url_review':    item.dir_url,
                'price':         pricerange(item),
                'abstract':      item.short_desc || "",
                'brand':         (item.developer && item.developer.name) || "",
                'products_buy':  Spice.quixey.quixey_buy,

                // this should be the array of screenshots with captions
                // and check for the existence of them
                'img_m': quixey_image(item.editions[0].screenshots[0].image_url)
            };
        },

        relevancy: {
            type: DDG.get_query().match(category_regexp) ? "category" : "primary",

            skip_words: [
                "android",
                "app",
                "apple app store",
                "apple app",
                "application",
                "applications",
                "apps",
                "blackberry",
                "download",
                "downloaded",
                "droid",
                "free",
                "google play store",
                "google play",
                "ios",
                "ipad",
                "iphone",
                "ipod touch",
                "ipod",
                "playbook",
                "release data",
                "release",
                "search",
                "windows mobile",
                "windows phone 8",
                "windows phone"
            ],

            category: [
                { required: 'icon_url' },
                { key: 'short_desc' },
                { key: 'name' },
                { key: 'custom.features.category', match: category_regexp, strict:true }    // strict means this key has to contain a category phrase or we reject
            ],

            primary: [
                { required: 'icon_url' },
                { key: 'name' },
                { key: 'short_desc', strict: false }
            ],

            // secondary:  [
            //     { key: 'short_desc' },
            //     { key: 'name' },
            //     { key: 'custom.features.category' },
            //     { required: 'icon_url' }
            // ],

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
                        return r*r*r*count/5;
                    };
                    return rank(a.rating,a.rating_count) > rank(b.rating, b.rating_count) ? -1: 1;
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

        templates: {
            item: DDG.templates.products,
            item_variant: 'short',
            detail: DDG.templates.products_detail
        }
    });

}

// format a price
// p is expected to be a number
function qprice(p) {
    if (p == 0) {    // == type coercion is ok here
        return "FREE";
    }

    return "$" + (p/100).toFixed(2).toString();
}

// template helper for price formatting
// {{price x}}
Handlebars.registerHelper("qprice", function(obj) {
    return qprice(obj);
});


var quixey_image = function(image_url) {
    return "http://" + quixey_image_domain + image_url.match(/\/image\/.+/)[0];
}

var make_icon_url = function(item) {
    var domain = "d1z22zla46lb9g.cloudfront.net",
        icon_url = item.icon_url;

    if (!icon_url) {
        console.warn("quixey: icon_url is null for %o", item);
        if (item.editions && item.editions[0].icon_url)
            icon_url = item.editions[0].icon_url;
        else
            return "";
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


Handlebars.registerHelper("toHTTP", function(icon_url, platforms) {
    var domain = "d1z22zla46lb9g.cloudfront.net";

    // Get the image server that the icon_url in platforms is pointing to.
    // It's not ideal, but the link to the app's image still has to redirect
    // and it redirects to HTTPS. What we want is an HTTP link (for speed).
    if(platforms && platforms.length > 0 && platforms[0].icon_url) {
    domain = platforms[0].icon_url.match(/https?:\/\/([^\/]+)/)[1];
    }

    // Replace the domain in our icon_url to the one that we got from
    // the platforms array.
    icon_url = icon_url.match(/\/image\/.+/)[0];
    return "http://" + domain + icon_url;
});


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
    if (this.id === 2004 || this.id === 2015) {
        return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
    }

    // return "/iu/?u=" + icon_url + "&f=1";
    return icon_url;
});

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

// template helper to give url for star icon
Handlebars.registerHelper("quixey_star", function() {
    return DDG.get_asset_path("quixey", "star.png").replace("//", "/");
});


})(this);
