function ddg_spice_lastfm_events(api_result) {
	if(api_result.error) {
		return;
	}

	Spice.render({
	    data              : api_result,
	    force_big_header  : true,
	    header1           : "Concerts in " + api_result.events["@attr"].location,
	    source_name       : "Last.fm",
	    source_url        : "http://www.last.fm/events",
	    template_normal   : "events",
	    template_small    : "events"
	});
}

Handlebars.registerHelper('date', function(text) {
    return text.substr(0, text.lastIndexOf(" "));
});

Handlebars.registerHelper('list', function(items, options) {
	var out = "";
	for(var i = 0; i < items.length && i < 5; i += 1) {
		out += options.fn(items[i])
	}
	return out;
});
