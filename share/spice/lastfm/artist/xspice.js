var ddg_spice_lastfm_artist_all = function(api_result) {
    "use strict";

    // Don't do anything if we find an error.
    if(api_result.error) {
        return;
    }

    // Display the plugin.
    Spice.render({
        data             : api_result,
        force_big_header : true,
        header1          : api_result.artist.name,
        source_name      : "Last.fm",
        source_url       : api_result.artist.url,
        template_normal  : "artist"
    });

    // This minimizes and expands the text.
    $(document).ready(function() {
        $("#expand").click(function() {
            DDG.toggle("all", 1);
            DDG.toggle("some", -1);
            DDG.toggle("expand", -1);
        });
    });
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

// This function calls similar.handlebars, and it only shows
// the similar artists.
var ddg_spice_lastfm_artist_similar = function(api_result) {
    "use strict";

    // Don't do anything if we find an error.
    if(api_result.error) {
        return;
    }

    // Display the plugin.
    Spice.render({
        data             : api_result,
        force_big_header : true,
        header1          : api_result.artist.name,
        source_name      : "Last.fm",
        source_url       : api_result.artist.url,
        template_normal  : "similar"
    });
};