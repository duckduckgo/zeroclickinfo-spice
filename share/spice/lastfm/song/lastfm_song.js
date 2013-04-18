var ddg_spice_lastfm_song = function(api_result) {
    Spice.render({
        data             : api_result,
        header1          : api_result.track.name,
        source_url       : api_result.track.url,
        source_name      : "Last.fm",
        template_normal  : "lastfm_song",
        force_big_header : true
    });
};

Handlebars.registerHelper("listen", function(artist, album, options) {
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
})