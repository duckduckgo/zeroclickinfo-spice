function ddg_spice_lastfm_top_tracks(api_result) {
    Spice.render({
        data             : api_result,
        header1          : "Top Songs (" + api_result.toptracks["@attr"].country + ")",
        source_name      : "Last.fm",
        source_url       : "http://www.last.fm/charts/tracks/top",

	template_frame   : "list",
	template_options : {
	    items: api_result.toptracks.track,
	    template_item: "lastfm_top_tracks_item",
	    single_template: "lastfm_top_tracks",
	    show: 3,
	    max: 10,
	    type: "ul"
	},

        force_big_header : true,
        force_no_fold    : true
    });
}

Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});
