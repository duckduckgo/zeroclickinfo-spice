(function (env) {
    "use strict";

    env.ddg_spice_go_watch_it = function (api_result) {
        if (!api_result || api_result.error ||
            !DDG.getProperty(api_result, 'search.movies') ||
            !DDG.getProperty(api_result, 'search.shows') ||
            api_result.search.movies.length === 0 && api_result.search.shows.length === 0) {
                return Spice.failed('go_watch_it');
        }

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

        // We use this variable to find duplicate Netflix items
        // We'd want to merge them into one.
        var foundNetflix = false;

        Spice.add({
            id: "go_watch_it",
            name: "Watch",
            data: watchable.availabilities,
            meta: {
                sourceName: 'GoWatchIt',
                sourceUrl: getUrl(watchable),
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
                    item.provider_format_logos = provider_icons[item.provider_format_id];
                    item.provider_format_logos.light += append;
                    item.provider_format_logos.dark += append;
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

    // Private functions, variables and helpers

    function getUrl(watchable) {
        return 'http://gowatchit.com' + (watchable.url ? watchable.url : "");
    }
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
    var append = ((DDG.is3x || DDG.is2x) ? "@2x.png" : ".png"),
        path = "assets/",
        skip_providers = {
            // Movies on Demand
            10: 1,
            // Filmmaker Direct Streaming
            46: 1,
            // DirecTV
            113: 1
        },
        provider_icons = {
            1: {
                dark: DDG.get_asset_path('go_watch_it', path + 'netflix'),
                light: DDG.get_asset_path('go_watch_it', path + 'netflix')
            },
            2: {
                dark: DDG.get_asset_path('go_watch_it', path + 'netflix'),
                light: DDG.get_asset_path('go_watch_it', path + 'netflix')
            },
            3: {
                dark: DDG.get_asset_path('go_watch_it', path + 'itunes'),
                light: DDG.get_asset_path('go_watch_it', path + 'itunes-alt')
            },
            5: {
                dark: DDG.get_asset_path('go_watch_it', path + 'vudu'),
                light: DDG.get_asset_path('go_watch_it', path + 'vudu')
            },
            7: {
                dark: DDG.get_asset_path('go_watch_it', path + 'amazon'),
                light: DDG.get_asset_path('go_watch_it', path + 'amazon-alt')
            },
            12: {
                dark: DDG.get_asset_path('go_watch_it', path + 'youtube'),
                light: DDG.get_asset_path('go_watch_it', path + 'youtube-alt')
            },
            13: {
                dark: DDG.get_asset_path('go_watch_it', path + 'sundance'),
                light: DDG.get_asset_path('go_watch_it', path + 'sundance-alt')
            },
            18: {
                dark: DDG.get_asset_path('go_watch_it', path + 'googleplay'),
                light: DDG.get_asset_path('go_watch_it', path + 'googleplay-alt')
            },
            19: {
                dark: DDG.get_asset_path('go_watch_it', path + 'xboxvideo'),
                light: DDG.get_asset_path('go_watch_it', path + 'xboxvideo')
            },
            64: {
                dark: DDG.get_asset_path('go_watch_it', path + 'flixster'),
                light: DDG.get_asset_path('go_watch_it', path + 'flixster')
            },
            20: {
                dark: DDG.get_asset_path('go_watch_it', path + 'sony'),
                light: DDG.get_asset_path('go_watch_it', path + 'sony-alt')
            },
            76: {
                dark: DDG.get_asset_path('go_watch_it', path + 'disney'),
                light: DDG.get_asset_path('go_watch_it', path + 'disney-alt')
            },
            21: {
                dark: DDG.get_asset_path('go_watch_it', path + 'hulu'),
                light: DDG.get_asset_path('go_watch_it', path + 'hulu')
            },
            31: {
                dark: DDG.get_asset_path('go_watch_it', path + 'bestbuy'),
                light: DDG.get_asset_path('go_watch_it', path + 'bestbuy')
            },
            32: {
                dark: DDG.get_asset_path('go_watch_it', path + 'walmart'),
                light: DDG.get_asset_path('go_watch_it', path + 'walmart')
            },
            36: {
                dark: DDG.get_asset_path('go_watch_it', path + 'target'),
                light: DDG.get_asset_path('go_watch_it', path + 'target')
            },
            37: {
                dark: DDG.get_asset_path('go_watch_it', path + 'targetticket'),
                light: DDG.get_asset_path('go_watch_it', path + 'targetticket')
            },
            9: {
                dark: DDG.get_asset_path('go_watch_it', path + 'redbox'),
                light: DDG.get_asset_path('go_watch_it', path + 'redbox')
            },
            65: {
                dark: DDG.get_asset_path('go_watch_it', path + 'crackle'),
                light: DDG.get_asset_path('go_watch_it', path + 'crackle-alt')
            },
            4: {
                dark: DDG.get_asset_path('go_watch_it', path + 'fandango'),
                light: DDG.get_asset_path('go_watch_it', path + 'fandango')
            },
            23: {
                dark: DDG.get_asset_path('go_watch_it', path + 'vhx'),
                light: DDG.get_asset_path('go_watch_it', path + 'vhx-alt')
            },
            14: {
                dark: DDG.get_asset_path('go_watch_it', path + 'hulu'),
                light: DDG.get_asset_path('go_watch_it', path + 'hulu')
            }
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
        if (buy_line && buy_line !== "" && !/\$0\.00/.test(buy_line) && /\$/.test(buy_line)) {
            this.rent_line = "";
        } else if(rent_line && rent_line !== "" && !/\$0\.00/.test(rent_line) && /\$/.test(rent_line) && /\$/.test(rent_line)) {
            this.buy_line = "";    
        } else {
            return options.inverse(this);
        }
        
        return options.fn(this);
    });

    // Check to see if both buy_line and rent_line are present.
    Spice.registerHelper("gwi_ifHasBothBuyAndRent", function (buy_line, rent_line, options) {
        if (buy_line && buy_line !== "" && rent_line && rent_line !== "" && !/\$0\.00/.test(buy_line) && !/\$0\.00/.test(rent_line) && /\$/.test(buy_line) && /\$/.test(rent_line)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Grab dollar amount from 'Rent from $X.XX' string.
    Spice.registerHelper("gwi_price", function (line, options) {
        if(/\$/.test(line)) {
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
