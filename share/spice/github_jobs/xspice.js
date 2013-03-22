function ddg_spice_github(response) {
    if (response.length > 0) return;
    var jobs = response;
    var query = DDG.get_query();
    var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
	jobs['description'] = query.replace(re, "$1");
	jobs['location'] = query.replace(re, "$2");
    Spice.render({
        data             : { 'job' : jobs },
        header1          : query + " (GitHub Jobs)",
        source_url       : 'https://jobs.github.com/positions?description=' 
                            + encodeURIComponent(description)
                            + "&location=" +  encodeURIComponent(location);
        source_name      : 'GitHub',
        template_normal  : 'github_jobs',
        force_big_header : true
    });
}
