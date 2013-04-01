var ddg_spice_lastfm_events = function(api_result) {
    "use strict";

    // Check if we encountered an error.
    if(api_result.error) {
        return;
    }

    // Display the spice plugin.
    Spice.render({
        data              : api_result,
        force_big_header  : true,
        header1           : "Concerts Near Me",
        source_name       : "Last.fm",
        source_url        : "http://www.last.fm/events",
        template_normal   : "events",
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

// Calculate the distance.
Handlebars.registerHelper("distance", function(longitude, latitude, location) {
    "use strict";

    // Convert degrees to radians.
    var toRad = function(degrees) {
        return degrees * Math.PI / 180;
    };

    // The coordinates of the venue.
    var pointOne = {
        latitude: toRad(latitude),
        longitude: toRad(longitude)
    };

    location = location.match(/\((.+),(.+)\)/);

    // The coordinates of the user.
    var pointTwo = {
        latitude: toRad(location[2]),
        longitude: toRad(location[1])
    };

    // Radius of the Earth (from Wolfram Alpha).
    var radius = "6367.5";

    // Compute the Haversin function (from Wikipedia).
    var haversin = function(distance) {
        return Math.pow(Math.sin(distance) / 2, 2);
    };

    var square = Math.sqrt(haversin(pointTwo.latitude - pointOne.latitude) +
                           Math.cos(pointOne.latitude) * Math.cos(pointTwo.latitude) *
                           haversin(pointTwo.longitude - pointOne.longitude));

    var distance = 2 * radius * Math.asin(square);

    return Math.floor(distance) + " km.";
});