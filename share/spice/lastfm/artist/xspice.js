// This function checks for errors, and it's also the one that calls Spice.render.
var ddg_spice_lastfm = function(api_result, template) {
    "use strict";

    // These words should be skipped in the isRelevant function.
    var skip = {
        "similar": 1,
        "band": 1,
        "bands": 1,
        "musician": 1,
        "musicians": 1,
        "player": 1,
        "artist": 1,
        "artists": 1,
        "performer": 1,
        "performers": 1,
        "singer": 1,
        "singers": 1,
        "rapper": 1,
        "dj": 1,
        "rappers": 1,
        "vocalist": 1,
        "vocalists": 1,
        "djs": 1,
        "songster": 1,
        "songsters": 1
    };

    // Don't do anything if we find an error, or if the result is irrelevant.
    if(api_result.error || !api_result.artist || !api_result.artist.name) {
        return;
    }

    // Display the plugin.
    if(DDG.isRelevant(api_result.artist.name, skip)) {
        Spice.render({
            data             : api_result,
            force_big_header : true,
            header1          : api_result.artist.name,
            source_name      : "Last.fm",
            source_url       : api_result.artist.url,
            template_normal  : template
        });
    }
};

// This function calls artist.handlebars, and it shows everything about the artist.
var ddg_spice_lastfm_artist_all = function(api_result) {
    "use strict";
    
    // Display the plugin.   
    ddg_spice_lastfm(api_result, "artist");

    // This minimizes and expands the text.
    // This piece of code is only relevant to this function, and it's not needed
    // when displaying similar artists.
    $(document).ready(function() {
        $("#expand").click(function() {
            DDG.toggle("all", 1);
            DDG.toggle("some", -1);
            DDG.toggle("expand", -1);
        });
    });
};

// This function calls similar.handlebars, and it only shows the similar artists.
var ddg_spice_lastfm_artist_similar = function(api_result) {
    "use strict";

    ddg_spice_lastfm(api_result, "similar");
};

// This helper removes the HTML tags, and it also shortens the text.
Handlebars.registerHelper("snippet", function(text, method) {
    "use strict";

    // Remove the tags (thanks to Underscore.string).
    var stripTags = function(text) {
        return String(text).replace(/<\/?[^>]+>/g, "");
    };

    // This shortens the text.
    if(method === "some") {
        return stripTags(text).slice(0, 200);
    } else {
        return stripTags(text);
    }
});

// This helper adds a comma between a list of links.
Handlebars.registerHelper("list", function(items, options) {
    "use strict";

    var similar_artists = [];

    for(var i = 0; i < items.length; i += 1) {
        similar_artists.push(options.fn(items[i]));
    }

    // Only get the first n - 1 items because we want
    // to add a coordinating conjunction before the last item.
    var first = similar_artists.slice(0, similar_artists.length - 1);
    first = first.join(", ");

    return first + ", and " + similar_artists[similar_artists.length - 1] + ".";
});