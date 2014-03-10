function ddg_spice_steam_db(api_result) {
    if(!api_result || !api_result.success) {
	return;
    }

    // Get the original query.
    // This is not a clean way of doing it, but it does the job.
    var script = $('[src*="/js/spice/steam_db/"]')[0],
        source = $(script).attr('src'),
        query = source.match(/steam_db\/([^\/]+)/)[1];

    // Filter irrelevant games.
    var skip_words = ["steamdb", "steam", "game", "app", "appid"];
    var results = [];
    for(var i = 0; i < api_result.data.length; i++) {
	if(DDG.isRelevant(api_result.data[i].StoreName, skip_words)) {
	    results.push(api_result.data[i]);
	}
    }

    if(results.length === 0) {
	return;
    }

    // This displays the Spice instant answer.
    Spice.render({
	data              : results,
	source_name       : "steamdb.info",
	source_url        : "http://steamdb.info/search/?a=app&type=1&q=" + query,
	spice_name        : 'steam_db',
	template_frame    : "list",
	header1           : decodeURIComponent(query) + " (SteamDB)",
	template_options  : {
	    items: results,
	    show: 3,
	    max: 10,
	    template_item: 'steam_db'
	},
	force_no_fold     : true
    });
};
