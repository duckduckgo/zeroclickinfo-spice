(function (env) {
    "use strict";

    function getAlertAvailability(watchable) {
        var avail = {
            provider_format_logos: {
                dark: 'http://s3.amazonaws.com/gowatchit/partner_logos/gowatchit_logo_white_bars.jpg'
            },
            buy_line: watchable.title,
            format_line: "Set Alerts",
            watch_now_url: getUrl(watchable)
        }
        return avail;
    }

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

        watchable.availabilities.push(getAlertAvailability(watchable));

        var streaming_providers = {
            "YouTube": 1,
            "Google Play": 1
        };
        
        Spice.add({
            id: "go_watch_it",
            name: "How to Watch",
            data: watchable.availabilities,
            meta: {
                sourceName: 'GoWatchIt',
                sourceUrl: getUrl(watchable),
                itemType: 'Availabilities'
            },
            normalize: function(item) {
                if(item.provider_name in streaming_providers) {
                    item.buy_line = "Available for Streaming";
                }
                
                return {
                    url: item.watch_now_url
                }
            },

            templates: {
                item: 'base_item',
                options: {
                    content: Spice.go_watch_it.content
                }
            }
        });
    };

    Spice.registerHelper("buyOrRent", function(buy_line, rent_line, options) {
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