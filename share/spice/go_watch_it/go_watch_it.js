(function (env) {
    "use strict";

    function getName(watchable) {
        var name = "Watch " + watchable.title;
        if (!watchable.url) {
            name += " (TV)"
        }
        name += " ("+watchable.year+")";

        return name;
    }

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

    env.ddg_spice_go_watch_it = function(data) {
        function getUrl(watchable) {
            return 'http://gowatchit.com' + (watchable.url ? watchable.url : "");
        }

        if (!data || data.error || data.search.movies.length === 0 && data.search.shows.length === 0) {
            return Spice.failed('GoWatchIt');
        }

        var movie = data.search.movies[0],
            show  = data.search.shows[0],
            watchable = movie || show;

        watchable.availabilities.push(getAlertAvailability(watchable));

        Spice.add({
            id: "go_watch_it",
            name: getName(watchable),
            data: watchable.availabilities,
            meta: {
                sourceName: 'gowatchit.com',
                sourceUrl: getUrl(watchable),
                itemType: 'Availabilities',
            },
            normalize: function(item) {
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
}(this));

// Check to see if both buy_line and rent_line are present.
Spice.registerHelper("gwi_ifHasBothBuyAndRent", function(buy_line, rent_line, options) {
    if (buy_line && buy_line != "" && rent_line && rent_line != "") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// Check to see if a value is present.
Spice.registerHelper("gwi_ifExists", function(buy_line, options) {
    if (buy_line && buy_line != "") {
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

Spice.registerHelper('gwi_imageProxy', function(options) {
    return "https://images.duckduckgo.com/iu/?u=";
});