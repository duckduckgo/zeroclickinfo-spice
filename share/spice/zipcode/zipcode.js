window.ddg_spice_zipcode = function(api_result) {
    "use strict";

    // Check errors.
    if(!api_result || !api_result.places || api_result.places.total === 0) {
        return;
    }

    // Get the original query.
    var query;
    $("script").each(function() {
        var matched, result;
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/zipcode\/(.+?)\//);
            if(result) {
                query = result[1];
            }
        }
    });

    // Expose the query. We want a Handlebars helper to use it later.
    window.ddg_spice_zipcode.query = query;

    // Display the Spice plugin.
    Spice.render({
        data              : api_result,
        header1           : api_result.places.place[0].admin2 + ", " + api_result.places.place[0].admin1,
        force_big_header  : true,
        source_name       : "MapQuest",
        source_url        : "http://mapq.st/map?q=" + query,
        template_normal   : "zipcode"
    });
};

// Filter the zipcodes.
// Only get the ones which are actually equal to the query.
Handlebars.registerHelper("checkZipcode", function(context) {
    "use strict";

    var result = [];
    var place = this.places.place;
    var name = window.ddg_spice_zipcode.query;

    if(place.length === 1) {
        return;
    }

    for(var i = 1; i < place.length; i += 1) {
        if(place[i].name === name) {
            result.push(place[i]);
        }
    }

    return context.fn(result);
});

Handlebars.registerHelper("bigbox", function(northEast, southWest) {
    var boxpad = (northEast.latitude - southWest.latitude) * 0.25;

    return [[northEast.latitude + boxpad, southWest.longitude],
                  [southWest.latitude - boxpad, northEast.longitude]].join();
});

Handlebars.registerHelper("coordString", function(northEast, southWest) {
    var box = [[southWest.latitude, southWest.longitude],
               [northEast.latitude, southWest.longitude],
               [northEast.latitude, northEast.longitude],
               [southWest.latitude, northEast.longitude],
               [southWest.latitude, southWest.longitude]];

    for(var i = 0; i < box.length; i += 1) {
        box[i] = box[i].join();
    }

    return box.join(",");
});