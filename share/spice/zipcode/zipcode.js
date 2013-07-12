function ddg_spice_zipcode (api_result) {
    "use strict";

    // Check errors.
    if(!api_result || !api_result.places || api_result.places.total === 0) {
        return;
    }

    // Get the original query zipcode and country name
    var query,
        script  = $("[src*='js/spice/zipcode']")[0],
        source  = $(script).attr("src"),
        matches = source.match(/\/([^\/]+)\/(\w+)$/);

    // expose the zipcode and country from the query
    api_result.zip = matches[1];
    api_result.country = matches[2];

    // Get the right result based on the query
    var place = zipcode_getCountry(api_result, matches);

    api_result.relevantPlace = place;

    // Make sure we have a relevant result
    if (!place) return;

    // Get location
    var names = ["locality1", "admin2", "admin1"],
        header = [];

    for (var i = 0; i < names.length ; i++) {
        var name = place[names[i]];
        if (name.length && header.indexOf(name) === -1) header.push(name);
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

// If a country was specified in the query
// select the result which returned for the
// given country or return null if no match
function zipcode_getCountry (result, matches) {

    var zip     = result.zip,
        country = result.country,
        locs    = result.places.place;

    for (var i = 0; i < locs.length; i++) {

        var current = locs[i];
        var resName = current.name.replace(/s+/, "");

        // check if zipcodes match and either countries match OR no country specified
        if (resName === zip && ( country === "ZZ" || current["country attrs"].code === country )){
            return locs[i];
        };
    };
    return null;
};

// Filter the zipcodes.
// Only get the ones which are actually equal to the query.
Handlebars.registerHelper("checkZipcode", function(options) {
    "use strict";

    var result  = [],
        locs    = this.places.place,
        name    = this.zip,
        country = this.relevantPlace["country attrs"].code;

    if(locs.length === 1) return;

    locs = locs.sort(function(a, b) {
        return a.country > b.country ? 1 : -1;
    });

    for(var i = 1; i < locs.length; i += 1) {
        if(locs[i].name === name &&
            locs[i]["country attrs"].code !== country ) {
            result.push(locs[i]);
        }
    }

    if(result.length === 0) {
        return;
    }

    result = options.fn(result);

    if(result.replace(/\s+/, "") !== "") {
        return "Postal code " + name + " in other countries: " + result;
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