function ddg_spice_lastfm_top_tracks(api_result) {
    Spice.add({
        data             : api_result,
        header1          : "Top Songs (" + api_result.toptracks["@attr"].country + ")",
        sourceName      : "Last.fm",
        sourceUrl       : "http://www.last.fm/charts/tracks/top",

	id       : "lastfm_top_tracks",
	template_frame   : "list",
	template_options : {
	    items: api_result.toptracks.track,
	    template_item: "lastfm_top_tracks",
	    show: 3,
	    max: 10,
	    type: "ul"
	},

        
        
    });
}

Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});
