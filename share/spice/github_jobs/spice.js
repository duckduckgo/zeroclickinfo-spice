function ddg_spice_github_jobs(github) {
	if(github.length > 0) {
		var query = DDG.get_query();
		var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
		var description = query.replace(re, "$1");
		var location = query.replace(re, "$2");
		var moreat = "https://jobs.github.com/positions?description=" +  encodeURIComponent(description) + "&location=" +  encodeURIComponent(location);
		var out = ''
		out += '<div style="jobs"><ul>';
		for(var i = 0;i < github.length;i++) {
			out += '<li><a href="' + github[i].url + '">' + github[i].title 
                +  '</a> in ' + github[i].location + ' (' + github[i].company + ')</li>';
		}
		out += '</ul>';
		var items = [[]];
		items[0]['a'] = out;
		items[0]['h'] = query + ' (GitHub Jobs)';
		items[0]['s'] = 'GitHub';
		items[0]['u'] = moreat;
		items[0]['force_big_header'] = true;

		nra(items);
	}
}
