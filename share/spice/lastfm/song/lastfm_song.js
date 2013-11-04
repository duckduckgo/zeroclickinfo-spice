function ddg_spice_lastfm_song(api_result) {
    "use strict";

    // Check if it is an empty string.
    var checkString = function(string) {
        string = string.replace(/\s+/, "");
        return string === "";
    };

    // Exit if we find an error.
    if(!api_result || !api_result.track || !api_result.track.artist || checkString(api_result.track.name) || !api_result.track.mbid ||
        checkString(api_result.track.artist.name)) {
        return;
    }

    var skip = [
        "by",
        "track",
        "tracks",
        "song",
        "songs",
        "music",
        "from",
        "listen",
        "to"
    ];

    // Display the plug-in.
    if(DDG.isRelevant(api_result.track.name + " " + api_result.track.artist.name, skip)) {
        Spice.render({
            data             : api_result,
            header1          : api_result.track.name,
            source_url       : api_result.track.url,
            source_name      : "Last.fm",
            template_normal  : "lastfm_song",
            force_no_fold    : true,
            force_big_header : true
        });
    }
};

// Add links to other websites.
Handlebars.registerHelper("listen", function(artist, album, options) {
    "use strict";

    var listen = [["Rdio", "!rdio"], ["Grooveshark", "!grooveshark"], ["Amazon MP3", "!amazonmp3"]],
        result = [];

    for(var i = 0; i < listen.length; i += 1) {
        result.push(options.fn({
            title: listen[i][0],
            bang: "/?q=" + album + " by " + artist + " " + listen[i][1]
        }));
    }

    var first = result.slice(0, result.length - 1);
    first = first.join(", ");

    return first + ", or " + result[result.length - 1] + ".";
});