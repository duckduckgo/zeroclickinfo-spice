function ddg_spice_github_jobs(api_result) {
    if (api_result.length == 0) { return; }

    var jobs = api_result;
    var query = DDG.get_query();
    var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
	jobs['description'] = query.replace(re, "$1");
	jobs['location'] = query.replace(re, "$2");

	var source_url = 'https://jobs.github.com/positions?description='
                            + encodeURIComponent(jobs['description'])
                            + "&location=" +  encodeURIComponent(jobs['location']);

	
	var desc = jobs['description'] + ' Jobs';
	if(jobs['location']){
		desc += ' in ' + jobs['location'];
	}

    Spice.render({
        data             : api_result,
		relevant_items   : api_result,
        source_url       : source_url,
		source_name      : 'GitHub',
        spice_name       : 'github_jobs',

		meta: {
			count: api_result.length,
			count_meta: desc,
			sourceUrl: source_url,
			sourceName: 'GitHub',
			sourceIcon: true
		},

		templates: {
			// ?? passing the string 'github_jobs_item' will
			// nest the template inside another tile template,
			// but passing the reference doesn't...
			item: Handlebars.templates.github_jobs_item,
			detail: Handlebars.templates.github_jobs_detail
		}
    });
}
