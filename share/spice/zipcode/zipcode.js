ddg_spice_zipcode = function(api_result) {
    "use strict";

    // Check errors.
    if(!api_result || !api_result.places || api_result.places.total === 0) {
        return;
    }

    // Get the original query zipcode and country name
    var query,
        script  = $("[src*='js/spice/zipcode']")[0],
        source  = $(script).attr("src"),
        matches = source.match(/\/([^\/]+)\/(\w+)$/),
        zip     = matches[1];

    // Expose the zipcode from the query
    api_result.zip = zip;

    var place = api_result.places.place[0];

    // Get location
    var names = ["locality1", "admin2", "admin1"],
        header = [];

    for (var i = 0; i < names.length ; i++) {
        var name = place[names[i]];
        if (name.length) header.push(name);
    };

    header.push(place.country);
    var header_string = header.join(", ");

    // Get latlong coords for "more at" link
    var latitude = place.centroid.latitude;
    var longitude = place.centroid.longitude;

    // Display the Spice plugin.
    Spice.render({
        data              : api_result,
        header1           : header_string,
        force_big_header  : true,
        source_name       : "MapQuest",
        source_url        : "http://mapq.st/map?q=" + encodeURIComponent(latitude + "," + longitude),
        template_normal   : "zipcode",
        force_no_fold     : true
    });
};

// Filter the zipcodes.
// Only get the ones which are actually equal to the query.
Handlebars.registerHelper("checkZipcode", function(options) {
    "use strict";

    var result = [];
    var place = this.places.place;
    var name = this.zip;

    if(place.length === 1) return;

    for(var i = 1; i < place.length; i += 1) {
        if(place[i].name === name) {
            result.push(place[i]);
        }
    }

    if(result.length === 0) {
        return;
    }

    result = options.fn(result);
    if(result.replace(/\s+/, "") !== "") {
        return "Similar postal codes: " + result;
    }
});

Handlebars.registerHelper("bigbox", function(northEast, southWest) {
    var boxpad = (northEast.latitude - southWest.latitude) * 0.25;

    return [[northEast.latitude + boxpad, southWest.longitude],
            [southWest.latitude - boxpad, northEast.longitude]].join();
});

Handlebars.registerHelper("coordString", function(northEast, southWest) {
    var box = [[southWest.latitude, southWest.longitude].join(),
               [northEast.latitude, southWest.longitude].join(),
               [northEast.latitude, northEast.longitude].join(),
               [southWest.latitude, northEast.longitude].join(),
               [southWest.latitude, southWest.longitude].join()];

    return box.join(",");
});