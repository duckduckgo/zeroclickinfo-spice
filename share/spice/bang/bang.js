function ddg_spice_bang() {
    "use strict";

    var query = DDG.get_query().replace(/^\?/g, '!');

    $.getJSON('https://api.duckduckgo.com/?q=' + query + '&format=json&no_redirect=1&callback=?', function (response) {
	if (!response || !response.Redirect) {
	    return;
	}

	var redirect = response.Redirect,
	    url = redirect.split('/'),
	    data = {
		href: '',
		query: query,
		text: url[0] + '//' + url[2] + '/'
	    };

	if (/^\![A-Za-z0-9.-]+ ?$/.test(query)) {
	    if (/[?&=]/.test(redirect)) {
		data.href = data.text;
	    } else {
		data.href = redirect;
	    }
	} else if (/^\![A-Za-z0-9.-]+ .+$/.test(query)) {
	    data.href = redirect;
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

ddg_spice_bang();
