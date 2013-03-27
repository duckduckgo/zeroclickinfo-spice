function ddg_spice_lastfm_top_tracks(api_result) {
    Spice.render({
        data             : api_result,
        force_big_header : true,
        header1          : "Top Songs (" + api_result.toptracks["@attr"].country + ")",
        source_name      : "Last.fm",
        source_url       : "http://www.last.fm/charts/tracks/top",
        template_normal  : "top"
    });
}

Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});