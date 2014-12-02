(function (env) {
    "use strict";

    env.ddg_spice_lastfm_song = function(api_result) {

        // Check if it is an empty string.
        var checkString = function(string) {
            string = string.replace(/\s+/, "");
            return string === "";
        };

        // Exit if we find an error.
        if(!api_result || !api_result.track || !api_result.track.artist || checkString(api_result.track.name) || !api_result.track.mbid ||
            checkString(api_result.track.artist.name)) {
            return Spice.failed('lastfm_song');
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
        Spice.add({
            id: 'lastfm_song',
            name: 'Music',
            data: api_result.track,
            meta: {
                sourceName: 'Last.fm',
                sourceUrl: api_result.track.url,
                sourceIconUrl: 'http://cdn.last.fm/flatness/favicon.2.ico'
            },
            normalize: function(item) {
                var duration = 	item.duration/1000;
                var seconds = duration % 60;
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return {
                    title: item.name + " (" + Math.floor(duration / 60) + ":" + seconds + ")"
                };
            },
            relevancy: {
                skip_words : skip,
                primary: [
                    { key: 'name' }, { key: 'artist.name' }
                ]
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.lastfm_song.content,
                    moreAt: true
                }
            }
        });
    };
}(this));

// Add links to other websites.
Handlebars.registerHelper("listen", function(artist, song, options) {
    "use strict";

    var listen = [["Rdio", "!rdio"], ["Grooveshark", "!grooveshark"], ["Amazon MP3", "!amazonmp3"], ["Soundcloud", "!soundcloud"]],
        result = [];

    for(var i = 0; i < listen.length; i += 1) {
        result.push(options.fn({
            title: listen[i][0],
            bang: "/?q=" + song + " by " + artist + " " + listen[i][1]
        }));
    }

    var first = result.slice(0, result.length);
    return first.join(", ");
});
