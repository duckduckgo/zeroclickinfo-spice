function ddg_spice_lastfm_song(api_result) {
    "use strict";
    // Check if it is an empty string.
    var checkString = function(string) {
        return string = string.replace(/\s+/, ""), "" === string;
    };
    // Exit if we find an error.
    if (!api_result || !api_result.track || !api_result.track.artist || checkString(api_result.track.name) || !api_result.track.mbid || checkString(api_result.track.artist.name)) {
        return;
    }
    var skip = [ "by", "track", "tracks", "song", "songs", "music", "from", "listen", "to" ];
    // Display the plug-in.
    if (DDG.isRelevant(api_result.track.name + " " + api_result.track.artist.name, skip)) {
        Spice.add({
            data: api_result,
            header1: api_result.track.name,
            sourceUrl: api_result.track.url,
            sourceName: "Last.fm",
            templates: {
                item: Spice.lastfm_song.lastfm_song,
                detail: Spice.lastfm_song.lastfm_song
            }
        });
    }
}

// Add links to other websites.
Handlebars.registerHelper("listen", function(artist, album, options) {
    "use strict";
    var listen = [ [ "Rdio", "!rdio" ], [ "Grooveshark", "!grooveshark" ], [ "Amazon MP3", "!amazonmp3" ] ], result = [];
    for (var i = 0; i < listen.length; i += 1) {
        result.push(options.fn({
            title: listen[i][0],
            bang: "/?q=" + album + " by " + artist + " " + listen[i][1]
        }));
    }
    var first = result.slice(0, result.length - 1);
    return first = first.join(", "), first + ", or " + result[result.length - 1] + ".";
});