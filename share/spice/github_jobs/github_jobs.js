function ddg_spice_github_jobs(api_result) {
    if (api_result.length == 0) return;

    var jobs = api_result;
    var query = DDG.get_query();
    var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
	jobs['description'] = query.replace(re, "$1");
	jobs['location'] = query.replace(re, "$2");

    Spice.render({
        data             : api_result,
        header1          : query + " (GitHub Jobs)",
        source_url       : 'https://jobs.github.com/positions?description='
                            + encodeURIComponent(jobs['description'])
                            + "&location=" +  encodeURIComponent(jobs['location']),
        source_name      : 'GitHub',
        spice_name      : 'github',

        template_frame   : 'list',
        template_options: {
            items: api_result,
            template_item: "github_jobs",
            show: 3,
            type: 'ul',
        },
        force_big_header : true,
        force_no_fold    : true
    });
}
