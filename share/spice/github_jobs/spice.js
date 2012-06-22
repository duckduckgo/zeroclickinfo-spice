function ddg_spice_github_jobs(github) {
	if(github.length > 0) {
		var query = DDG.get_query();
		var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
		var description = query.replace(re, "$1");
		var location = query.replace(re, "$2");
		var more_at = "https://jobs.github.com/positions?description=" +  encodeURIComponent(description) + "&location=" +  encodeURIComponent(location);
		var out = '', more = '';
		out += '<div style="jobs"><ul>';
		more += out;
		for(var i = 0;i < github.length;i++) {
            if(i > 5) {
            	more += '<li><a href="' + github[i].url + '">' + github[i].title 
                +  '</a> in ' + github[i].location + ' (' + github[i].company + ')</li>';
            } else {
            	out += '<li><a href="' + github[i].url + '">' + github[i].title 
                +  '</a> in ' + github[i].location + ' (' + github[i].company + ')</li>';
            }
		}
		out += '</ul>';
		more += '</ul>';
		var items = [[],[]];
		items[0]['a'] = out;
		items[0]['h'] = query + ' (GitHub Jobs)';
		items[0]['s'] = 'GitHub';
		items[0]['u'] = more_at;
		items[0]['force_big_header'] = true;
		items[0]['f'] = 1;

		//Second array
		if(github.length > 5) {
			items[1]['a'] = more;
			items[1]['t'] = '+More jobs';
			items[1]['s'] = 'GitHub';
			items[1]['u'] = more_at;
			items[1]['force_big_header'] = true;
			items[1]['f'] = 1;
		}
		nra(items);
	}
}
