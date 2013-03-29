function ddg_spice_lastfm_artist_all(api_result) {
    Spice.render({
        data             : api_result,
        force_big_header : true,
        header1          : api_result.artist.name,
        source_name      : "Last.fm",
        source_url       : api_result.artist.url,
        template_normal  : "artist"
    });
}

Handlebars.registerHelper('shorten', function(text) {
    var stripTags = function(text) {
        return String(str).replace(/<\/?[^>]+>/g, '');
    }

    return stripTags(text);
});