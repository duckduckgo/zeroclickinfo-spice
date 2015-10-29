(function(env) {
    "use strict";

    env.ddg_spice_quixey = function(api_result) {

        if (!(api_result && api_result.results && api_result.results.length)) {
            return Spice.failed('apps');
        }

       var qLower = api_result.q.toLowerCase(),
            categories = [
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
                itemType: 'Apps',
                sourceName: 'Quixey',
                searchTerm: api_result.q,
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

                // relevancy pre-filter: remove GoogleTV Android packages
                // API doesn't differentiate between GoogleTV Android and Android packages
                var reFilter = /Google\s?TV/i;

                for (var i in item.editions) {
                    var packageAppName = [
                        DDG.getProperty(item, "editions." + [i] + ".custom.features.package_name"),
                        DDG.getProperty(item, "editions." + [i] + ".name")
                    ].join(" ");

                    if (packageAppName.match(reFilter)) {
                        item.editions.splice(i,1);
                   }
                }

                var icon_url = make_icon_url(item);
                if (!icon_url){
                    return null;
                }

                var screenshot = DDG.getProperty(item, 'editions.0.screenshots.0.image_url');
                if (!screenshot){
                    return null;
                }

                if (item.name && item.name.toLowerCase() === qLower) {
                    item.exactMatch = true;
                } else if (item.developer && item.developer.name && item.developer.name.toLowerCase() === qLower) {
                    item.boost = true;
                }

                var features = DDG.getProperty(item, "editions.0.custom.features") || {};

                return {
                    img:           DDG.toHTTPS(icon_url),
                    img_m:         screenshot,
                    title:         item.name,
                    heading:       item.name,
                    rating:        item.rating,
                    reviewCount:   features.allversions_rating_count || features.rating_count || null,
                    url_review:    item.dir_url,
                    price:         pricerange(item),
                    abstract:      item.short_desc || null,
                    brand:         (item.developer && item.developer.name) || null
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

            templates: {
                group: 'products',
                options: {
                    buy: Spice.quixey.buy
                },
                variants: {
                    tile: 'narrow'
                }
            }
        });
    };

    // format a price
    // p is expected to be a number
    function qprice(p) {

        if (p == 0) {    // == type coercion is ok here
            return "FREE";
        }

        return "$" + (p/100).toFixed(2).toString();
    }

    function make_icon_url(item) {
        var icon_url = item.icon_url || null;

        if (!icon_url) {
            if (item.editions){
                $.each(item.editions, function(index, edition) {
                    if (edition.icon_url){
                        icon_url = item.editions.icon_url;
                        return false
                    }
                });
            }
        }
        return icon_url;
    };


    // template helper to format a price range
    function pricerange(item) {

        if (!item || !item.editions) {
            return "";
        }

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

    // template helper for price formatting
    // {{price x}}
    Handlebars.registerHelper("Quixey_qprice", function(obj) {
        return qprice(obj);
    });

    // template helper to replace iphone, ipod, and android icons with
    // smaller 'Apple' and 'Android' icons
    Handlebars.registerHelper("Quixey_platform_icon", function(icon_url) {
        // Apple IDs
        if (this.id === 2004 || this.id === 2015) {
            return "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
        }

        // Android ID
        if (this.id === 2005) {
            return "https://icons.duckduckgo.com/ip2/www.android.com.ico";
        }

        return "/iu/?u=" + icon_url + "&f=1";
    });

    // template helper that returns and unifies platform names
    Handlebars.registerHelper("Quixey_platform_name", function() {
        var name;
        var platforms = this.platforms;

        name = platforms[0].name;

        if (platforms.length > 1) {
            switch (platforms[0].name) {
                case "iPhone":
                case "iPad":
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
