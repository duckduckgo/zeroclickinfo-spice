(function (env) {
    "use strict";

    function getUrl(watchable) {
        return 'http://gowatchit.com' + (watchable.url ? watchable.url : "");
    }

    env.ddg_spice_go_watch_it = function(api_result) {
        // Check if the data that we get is sane.        
        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'search.movies') || 
            !DDG.getProperty(api_result, 'search.shows') || api_result.search.movies.length === 0 && 
            api_result.search.shows.length === 0) {
            return Spice.failed('go_watch_it');
        }

        // Get the first result.
        // This probably shouldn't be the way to do it, but it works for now.
        var movie = api_result.search.movies[0],
            show  = api_result.search.shows[0],
            watchable = movie || show;
        
        var title = watchable.title;
        
        // Exit if there are no available streaming sources.
        if(watchable.availabilities.length === 0) {
            return Spice.failed('go_watch_it');
        }
        
        // Check the relevancy of the title and be strict about it.
        var skipArray = ["watch", "stream", "demand", "now", "online", "buy", "rent", "movie", "show", "tv"];
        if(!DDG.isRelevant(title, skipArray, undefined, true)) {
            return Spice.failed('go_watch_it');
        }
        
        var streaming_providers = {
            "YouTube": 1,
            "Google Play": 1,
            "Disney Movies Anywhere": 1,
            "Target Ticket": 1,
            "Hulu": 1,
            "Crackle": 1,
            "Flixster": 1
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
        
        var skip_providers = {
            // Movies on Demand
            10: 1,
            // Filmmaker Direct Streaming
            46: 1
        };
        
        // We use this variable to find duplicate Netflix items. 
        // We'd want to merge them into one.
        var foundNetflix = false;
        
        Spice.add({
            id: "go_watch_it",
            name: "Watch",
            data: watchable.availabilities,
            meta: {
                sourceName: 'GoWatchIt',
                sourceUrl: getUrl(watchable),
                itemType: 'Providers for ' + title + " (" + watchable.year + ")" 
            },
            normalize: function(item) {
                if(item.provider_format_id in skip_providers) {
                    return null;
                }
                
                // Try to strip anything that comes before the price.
                item.buy_line = item.buy_line.replace(/^[a-z ]+/i, "");
                item.rent_line = item.rent_line.replace(/^[a-z ]+/i, "");

                // If the provider is in this hash, it means that they provide 
                // streaming if they don't buy or sell stuff.
                if(item.provider_name in streaming_providers && 
                   item.buy_line === "" && item.rent_line === "") {
                    item.buy_line = "Available for Streaming";
                }
                
                // If the provider is in this hash, it means that they sell it 
                // but they don't have the actual price to display.
                if(item.provider_name in purchase_providers && 
                   item.buy_line === "") {
                    item.buy_line = "Available for Purchase";
                    item.rent_line = "";
                }
                
                // Change the format line to match the other tiles.
                if(item.format_line === "DVD & Blu-ray") {
                    item.format_line = "DVD / Blu-ray";
                }
                
                // Only return a single Netflix item
                if(item.provider_name === "Netflix") {
                    if(!foundNetflix) {
                        foundNetflix = true;
                    } else if(item.category !== "online") {
                        return null;
                    }
                }
                
                // Replace the icon if we can.
                if(item.provider_format_id in provider_icons) {
                    item.provider_format_logos = provider_icons[item.provider_format_id];
                    item.provider_format_logos.light += append;
                    item.provider_format_logos.dark += append;
                } else {
                    return null;
                }
                
                return {
                    url: item.watch_now_url
                }
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

    Spice.registerHelper("gwi_buyOrRent", function(buy_line, rent_line, options) {
        if(buy_line && buy_line !== "") {
            this.line = buy_line;
            return options.fn(this);
        }
        
        this.line = rent_line;
        return options.fn(this);
    });
    
    // Check to see if both buy_line and rent_line are present.
    Spice.registerHelper("gwi_ifHasBothBuyAndRent", function(buy_line, rent_line, options) {
        if (buy_line && buy_line !== "" && rent_line && rent_line !== "") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Check to see if the buy_line/rent_line includes a price.
    // This is because some provider formats (like Netflix) have
    // 'Included with Subscription' in their buy line.
    Spice.registerHelper("gwi_ifHasPrice", function(line, options) {
        if (line.split("$").length > 1) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });


    // Grab dollar amount from 'Rent from $X.XX' string.
    Spice.registerHelper("gwi_price", function(line, options) {
        var strings = line.split("$")
        return "$" + strings[strings.length - 1]
    });

    // Get the class for the footer element based on whether or not both the buy_line
    // and rent_line are present.
    Spice.registerHelper("gwi_footerClass", function(buy_line, rent_line, options) {
        var klass = 'gwi-footer';
        if (buy_line && buy_line != '' && rent_line && rent_line != '') {
            klass += ' double';
        }

        return klass;
    });

}(this));