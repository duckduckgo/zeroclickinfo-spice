(function (env) {
    "use strict";

    // Private functions, variables and helpers
    var streaming_providers = {
        "YouTube": 1,
        "Google Play": 1,
        "Disney Movies Anywhere": 1,
        "Target Ticket": 1,
        "Hulu": 1,
        "Crackle": 1,
        "Flixster": 1,
        "Netflix": 1
    };

    var purchase_providers = {
        "Best Buy": 1,
        "Walmart": 1,
        "Target": 1,
        "Fandango": 1,
        "Amazon": 1,
        "Redbox": 1
    };

    // For retina screen return optimized images @2x.png
    var append = ((DDG.is3x || DDG.is2x) ? "@2x.png" : ".png");

    var path = "assets/";

    var skip_providers = {
        // Movies on Demand
        "10": 1,
        // Filmmaker Direct Streaming
        "46": 1,
        // DirecTV
        "113": 1
    };

    var provider_icons = {
        "1": ['netflix', 'netflix'],
        "2": ['netflix', 'netflix'],
        "3": ['itunes', 'itunes-alt'],
        "4": ['fandango', 'fandango'],
        "5": ['vudu', 'vudu'],
        "7": ['amazon', 'amazon-alt'],
        "9": ['redbox', 'redbox'],
        "12": ['youtube', 'youtube-alt'],
        "13": ['sundance', 'sundance-alt'],
        "14": ['hulu', 'hulu'],
        "18": ['googleplay', 'googleplay-alt'],
        "19": ['xboxvideo', 'xboxvideo'],
        "20": ['sony', 'sony-alt'],
        "21": ['hulu', 'hulu'],
        "23": ['vhx', 'vhx-alt'],
        "31": ['bestbuy', 'bestbuy'],
        "32": ['walmart', 'walmart'],
        "36": ['target', 'target'],
        "37": ['targetticket', 'targetticket'],
        "64": ['flixster', 'flixster'],
        "65": ['crackle', 'crackle-alt'],
        "76": ['disney', 'disney-alt']
    };

    var zero_re = /\$0\.00/;
    var dollar_re = /\$/;

    env.ddg_spice_go_watch_it = function (api_result) {
        if (!api_result || api_result.error ||
            !DDG.getProperty(api_result, 'search.movies') ||
            !DDG.getProperty(api_result, 'search.shows') ||
            api_result.search.movies.length === 0 && api_result.search.shows.length === 0) {
                return Spice.failed('go_watch_it');
        }

        // We use this variable to find duplicate Netflix items
        // We'd want to merge them into one.
        var foundNetflix = false;

        var watchable,
            fallbacks  = [],
            candidates = api_result.search.movies.concat(api_result.search.shows),
            skipArray  = ["watch", "stream", "demand", "now", "online", "buy", "rent", "movie", "show", "tv"];

        // Find first relevant candidate
        // API result order gives precedence to movies
        //
        // TODO: Find a way to determine if TV show is more relevant choice
        $.each(candidates, function(index, obj){

            // skip if there are no available streaming sources.
            if (!obj.availabilities || obj.availabilities.length === 0) {
                return 1; //skip to next candidate
            }

            if (obj.availabilities.length === 1 &&
                obj.availabilities[0].provider_format_id in skip_providers) {
                return 1; //skip to next candidate
            }

            // Check for strict relevancy of the title
            // min word length: 3
            if (DDG.isRelevant(obj.title, skipArray, 3, true)) {
                watchable = obj;
                return false; //relevant result -- break out of loop
            }

            // Check for any relevancy of the title
            if (DDG.isRelevant(obj.title, skipArray, 3, false)) {
                //store for later, incase no highly relevant results
                fallbacks.push(obj);
            } else {
                return 1; //skip to next candidate;
            }
        });

        // only a mostly relevant result
        if (!watchable && fallbacks.length) {
            watchable = fallbacks[0];
        }

        // no relevant results
        if (!watchable) {
            return Spice.failed("go_watch_it");
        }

        Spice.add({
            id: "go_watch_it",
            name: "Watch",
            data: watchable.availabilities,
            meta: {
                sourceName: 'GoWatchIt',
                sourceUrl: 'https://gowatchit.com' + (watchable.url ? watchable.url : ""),
                primaryText: 'Providers for ' + watchable.title + " (" + watchable.year + ")"
            },
            normalize: function (item) {
                if (item.provider_format_id in skip_providers) {
                    return null;
                }

                // Try to strip anything that comes before the price.
                if(/\$/.test(item.buy_line) || /\$/.test(item.rent_line)) {
                    item.buy_line = item.buy_line.replace(/^[a-z ]+/i, "");
                    item.rent_line = item.rent_line.replace(/^[a-z ]+/i, "");
                }

                // Change the format line to match the other tiles.
                if (item.format_line === "DVD & Blu-ray") {
                    item.format_line = "DVD / Blu-ray";
                }

                // If the provider is "Netflix Mail" Change buy_line and format_line
                if (item.provider_format_name === "Netflix Mail" && item.category !== "online") {
                    item.format_line = "Available on Blu-ray / DVD";
                }

                // Only return a single Netflix item
                if (item.provider_name === "Netflix") {
                    if (!foundNetflix) {
                        foundNetflix = true;
                    } else if (item.category !== "online") {
                        return null;
                    }
                }

                // Replace the icon if we can.
                if (item.provider_format_id in provider_icons) {
                    item.provider_format_logos_names = provider_icons[item.provider_format_id];
                    item.provider_format_logos.dark = DDG.get_asset_path('go_watch_it', path + item.provider_format_logos_names[0]) + append;
                    item.provider_format_logos.light = DDG.get_asset_path('go_watch_it', path + item.provider_format_logos_names[1]) + append;
                } else {
                    return null;
                }

                return {
                    url: item.watch_now_url
                };
            },
            templates: {
                item: 'base_item',
                options: {
                    content: Spice.go_watch_it.content
                },
                variants: {
                    tile: 'narrow'
                }
            }
        });
    };

    // Display something even if we don't have any price
    Spice.registerHelper("gwi_fallbackText", function(options) {
        var message = "Available";
        var rent_re = /rent_own/;
        var subscription_re = /subscription/;

        if(this.categories) {
            this.categories.forEach(function(elem) {
                if(rent_re.test(elem)) {
                    message = 'Available for Purchase or Rent';
                }
                if(subscription_re.test(elem)) {
                    message = 'Available with Subscription';
                }
            });
        }

        // If the provider is in this hash, it means that they sell it 
        // but they don't have the actual price to display.
        if (this.provider_name in purchase_providers && this.buy_line === "") {
            message = "Available for Purchase";
        }

        // If the provider is "Netflix Mail" Change buy_line and format_line
        if (this.provider_format_name === "Netflix Mail" && this.category !== "online") {
            message = "Available for Rent";
        }

        // Fandango has its own suggested line
        if (this.provider_name === "Fandango") {
            message = this.suggested_line;
        }

        // If the provider is in this hash, it means that they provide 
        // streaming if they don't buy or sell stuff.
        if (this.provider_name in streaming_providers && this.buy_line === "" && this.rent_line === "") {
            message = "Available for Streaming";
        }
        return message;
    });

    // Display the footer properly and show something if all fails.
    Spice.registerHelper('gwi_footer', function(format_line) {
        if(!format_line) {
            var quality = [];
            for(var format in this.formats) {
                if(quality.indexOf(this.formats[format].quality) === -1) {
                    quality.push(this.formats[format].quality);
                }
            }
            if(quality.length > 0) {
                format_line = "Available in " + quality.join(" / ");
            } else {
                format_line = "Available";
            }
        }
        return format_line;
    });

    Spice.registerHelper("gwi_buyOrRent", function (buy_line, rent_line, options) {
        if (buy_line && buy_line !== "" && !zero_re.test(buy_line) && dollar_re.test(buy_line)) {
            this.rent_line = "";
        } else if(rent_line && rent_line !== "" && !zero_re.test(rent_line) && dollar_re.test(rent_line)) {
            this.buy_line = "";
        } else {
            return options.inverse(this);
        }
        return options.fn(this);
    });

    // Check to see if both buy_line and rent_line are present.
    Spice.registerHelper("gwi_ifHasBothBuyAndRent", function (buy_line, rent_line, options) {
        if (buy_line && buy_line !== "" && rent_line && rent_line !== "" && !zero_re.test(buy_line) && !zero_re.test(rent_line) && dollar_re.test(buy_line) && dollar_re.test(rent_line)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Grab dollar amount from 'Rent from $X.XX' string.
    Spice.registerHelper("gwi_price", function (line, options) {
        if(dollar_re.test(line)) {
            var strings = line.split("$");
            return "$" + strings[strings.length - 1];
        }
        return line;
    });

    // Get the class for the footer element based on whether or not both the buy_line
    // and rent_line are present.
    Spice.registerHelper("gwi_footerClass", function (buy_line, rent_line, options) {
        var klass = 'gwi-footer';
        if (buy_line && buy_line !== '' && rent_line && rent_line !== '') {
            klass += ' double';
        }
        return klass;
    });
}(this));
