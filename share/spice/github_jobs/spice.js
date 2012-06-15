function ddg_spice_github_jobs(github) {
	if(github.length > 0) {
		console.log(github);
		var out = '', more = '';
		out += '<div style="jobs"><ul>';
		more += out;
		for(var i = 0;i < github.length;i++) {
			var bullet = '<li><a href="' + github[i].url + '">' + github[i].title + 
					'</a> (' + github[i].company + ') in ' + github[i].location + '</li>';
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
		items[0]['h'] = 'Github Jobs';
		items[0]['s'] = 'Github';
		items[0]['u'] = 'https://jobs.github.com/';
		items[0]['f'] = 1;

		if(github.length >= 5) {
			items[1]['a'] = more;
			items[1]['t'] = 'More jobs';
			items[1]['s'] = 'Github';
			items[1]['u'] = 'https://jobs.github.com/';
			items[1]['f'] = 1;
		}
		nra(items);
	}
}