function ddg_spice_github_jobs(github) {
	if(github.length > 0) {
		console.log(github);
		var out = '', length;
		if(github.length > 5) {
			length = 5;
		} else {
			length = github.length;
		}
		out += '<div style="jobs">';
		out += '<ul>';
		for(var i = 0;i < length;i++) {
			out += '<li><a href="' + github[i].url + '">' + github[i].title + 
					'</a> (' + github[i].company + ') in ' + github[i].location + '</li>';
			//out += '<br>';
		}
		out += '</ul>';
		var items = [[]];
		items[0]['a'] = out;
		items[0]['h'] = 'Github Jobs';
		items[0]['s'] = 'Github';
		items[0]['u'] = 'https://jobs.github.com/';
		items[0]['f'] = 1;
		nra(items);
	}
}