var ddg_spice_lastfm_events_location = function(api_result) {
    "use strict";

    // Check if we encountered an error.
    if(api_result.error) {
        return;
    }

    // Display the spice plugin.
    Spice.render({
        data              : api_result,
        force_big_header  : true,
        header1           : "Concerts Near " + api_result.events["@attr"].location,
        source_name       : "Last.fm",
        source_url        : "http://www.last.fm/events",
        template_normal   : "events_location",
        template_small    : "events"
    });
};

// Shortens the date.
Handlebars.registerHelper("date", function(text) {
    "use strict";

    return text.substr(0, text.lastIndexOf(" "));
});

// Limits the number of displayed items to five.
Handlebars.registerHelper("list", function(items, options) {
    "use strict";

    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});