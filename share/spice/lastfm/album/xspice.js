var ddg_spice_lastfm_album = function(api_result) {
    // Display the spice plugin.
    Spice.render({
        data              : api_result,
        force_big_header  : true,
        header1           : api_result.album.name + " (Album)",
        source_name       : "Last.fm",
        source_url        : api_result.album.url,
        template_normal   : "album",
    });

    $(document).ready(function() {
        $("#expand").click(function() {
            DDG.toggle("all", 1);
            DDG.toggle("some", -1);
            DDG.toggle("expand", -1);
        });
    });
};

// Shortens the date.
Handlebars.registerHelper("releasedate", function(date, options) {
    "use strict";

    // Make sure it's not a string filled with whitespace.
    date = date.replace(/^\s+|\s+$/g, "");
    // Let's trim the string.
    date = date.substr(0, date.lastIndexOf(","));

    options.fn({date: date});
});

// This helper adds a comma between a list of links.
Handlebars.registerHelper("list", function(items, options) {
    "use strict";

    var tracks = [];

    for(var i = 0; i < items.length && i < 5; i += 1) {
        tracks.push(options.fn(items[i]));
    }

    // Only get the first n - 1 items because we want
    // to add a coordinating conjunction before the last item.
    var first = tracks.slice(0, tracks.length - 1);
    first = first.join(", ");

    return first + ", and " + tracks[tracks.length - 1] + ".";
});

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