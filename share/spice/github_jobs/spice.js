function ddg_spice_github_jobs(github) {
	if(github.length > 0) {
		var query = DDG.get_query();
		var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
		var moreat = query.replace(re, "https://jobs.github.com/positions?description=$1&location=$2");
		console.log(github);
		var out = '', more = '';
		out += '<div style="jobs"><ul>';
		more += out;
		for(var i = 0;i < github.length;i++) {
			var bullet = '<li><a href="' + github[i].url + '">' + github[i].title + 
					'</a> in ' + github[i].location + ' (' + github[i].company + ')</li>';
			if(i < 5) {
				out += bullet;
			} else {
				more += bullet;
			}
		}
		out += '</ul>';
		more += '</ul>';
		var items = [[],[]];
		items[0]['a'] = out;
		items[0]['h'] = query + ' (Github Jobs)';
		items[0]['s'] = 'Github';
		items[0]['u'] = moreat;
		items[0]['f'] = 1;
		items[0]['force_big_header'] = true;

		if(github.length > 5) {
			items[1]['a'] = more;
			items[1]['t'] = 'More jobs';
			items[1]['s'] = 'Github';
			items[1]['u'] = moreat;
			items[1]['f'] = 1;
		}
		nra(items);
	}
}