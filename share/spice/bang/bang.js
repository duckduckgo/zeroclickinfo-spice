function ddg_spice_bang() {
    "use strict";

    var query = DDG.get_query();

    if (/^\?[A-Za-z0-9.-]+ ?$/.test(query)) {
	query = query.replace('?', '!') + '%20{{{s}}}';
    } else if (/^\?[A-Za-z0-9.-]+ .+$/.test(query)) {
	query = query.replace('?', '!');
    }

    $.getJSON('https://api.duckduckgo.com/?q=' + query + '&format=json&no_redirect=1&callback=?', function (response) {
	if (!response || !response.Redirect) {
	    return;
	}

	var data = {
	    redirect: response.Redirect,
	    search: false
	};

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
