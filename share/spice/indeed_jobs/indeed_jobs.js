function ddg_spice_indeed_jobs(api_result) {
    if (api_result.results.length == 0) return;
    
    var jobs = api_result.results,
        query = DDG.get_query(),
        q = api_result.query || '',
        loc = api_result.location || '',
        re = /^http:\/\/([a-z.]+)\//,
        rematch = api_result.results[0].url.match(re),
        www_domain = rematch ? rematch[0] : "http://www.indeed.com/";
    Spice.render({
        data             : api_result,
        header1          : query + " from Indeed",
        source_url       : www_domain + 'jobs?q='
                            + encodeURIComponent(q)
                            + "&l=" +  encodeURIComponent(loc),
        source_name      : 'Indeed',
        spice_name      : 'indeed',

        template_frame   : 'list',
        template_options: {
            items: api_result.results,
            template_item: "indeed_jobs",
            show: 4,
	        max: 10,
            type: 'ul'
        },
        force_big_header : true,
        force_no_fold    : true
    });
}
