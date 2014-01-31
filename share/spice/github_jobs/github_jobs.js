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
        id: 'github_jobs',
        name: 'Jobs',

        data: api_result,

        meta: {
            count: api_result.length,
            count_meta: desc,
            sourceUrl: source_url,
            sourceName: 'GitHub',
            sourceIcon: true
        },
        
        view: 'Tiles',

        templates: {
            item: 'github_jobs_item',
            detail: 'github_jobs_detail'
        }
    });
}
