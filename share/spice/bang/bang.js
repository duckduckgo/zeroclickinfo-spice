function ddg_spice_bang() {
    "use strict";

    $.getJSON('https://api.duckduckgo.com/?q=' + DDG.get_query().replace('?', '!').replace(/ .+/g, '') + '%20{{{s}}}&format=json&no_redirect=1&callback=?', function (response) {
	var data = {
	    redirect: response.Redirect,
	    search: false
	};

	if (!data.redirect) {
	    return;
	}

	if (data.redirect.indexOf(encodeURIComponent('{{{s}}}')) > -1) {
	    data.search = true;
	}

	Spice.render({
	    data             : data,
	    source_name      : 'DuckDuckGo',
	    source_url       : 'https://duckduckgo.com/bang.html',
	    spice_name       : 'bang',
	    template_normal  : 'bang',
	    force_no_fold    : true
	});
    });
}

// Decode "{{{s}}}"
Handlebars.registerHelper('decode', function (query) {
    "use strict";

   return decodeURIComponent(query);
});

ddg_spice_bang();