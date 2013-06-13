var ddg_spice_lastfm_album = function(api_result) {
    "use strict";

    var skip = [
        "album",
        "albums",
        "records",
        "cd",
        "cds"
    ];

    // Don't do anything if we find an error.
    if(api_result.error || !api_result.album || !api_result.album.name || !api_result.album.artist) {
        return;
    }

    // Display the spice plugin.
    // Check if it's relevant and see if it's popular enough (this is just a guess--we need to improve on this).
    // This successfully blocks:
    // - girl on fire album by alicia (Returns the wrong person. Maybe Last.fm has some sort of useCanonical?)
    // - circus album by eraserhead
    if(DDG.isRelevant(api_result.album.name, skip) && DDG.isRelevant(api_result.album.artist, skip) &&
        +api_result.album.playcount > 1000) {
        Spice.render({
            data              : api_result,
            force_big_header  : true,
            header1           : api_result.album.name + " (Album)",
            source_name       : "Last.fm",
            source_url        : api_result.album.url,
            template_normal   : "lastfm_album"
        });

        $(document).ready(function() {
            $("#expand").click(function() {
                DDG.toggle("all", 1);
                DDG.toggle("some", -1);
                DDG.toggle("expand", -1);
            });
        });
    }
};

// Shortens the date.
Handlebars.registerHelper("cleanDate", function(date, options) {
    "use strict";

    // Make sure it's not a string filled with whitespace.
    date = date.replace(/^\s+|\s+$/g, "");
    // Let's trim the string.
    date = date.substr(0, date.lastIndexOf(","));

    // Check if it's not an empty string.
    if(date) {
        options.fn({date: date});
    }
});

// Checks if we have tracks or songs available.
Handlebars.registerHelper("checkTracks", function(tracks, options) {
    "use strict";

    if(tracks && tracks.track && tracks.track.length > 0) {
        return options.fn(tracks);
    }
});

// Checks if we have information about the album.
Handlebars.registerHelper("checkWiki", function(wiki, options) {
    "use strict";

    var summary = "";
    if(wiki && wiki.summary) {
        // Make sure summary isn't full of white space.
        summary = wiki.summary.replace(/^\s*$/g, "");
        if(summary !== "") {
            return options.fn(wiki);
        }
    }
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