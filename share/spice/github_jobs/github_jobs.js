(function(env) {
    "use strict";

    env.ddg_spice_github_jobs = function(api_result) {

	if (api_result.length == 0) {
	    return;
	}

	var jobs = api_result;
	var query = DDG.get_query();
	var re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;
	jobs['description'] = query.replace(re, "$1");
	jobs['location'] = query.replace(re, "$2");
	
	var sourceUrl = 'https://jobs.github.com/positions?description='
            + encodeURIComponent(jobs['description'])
            + "&location=" +  encodeURIComponent(jobs['location']);

	Spice.add({
            id: 'github_jobs',
            name: 'Jobs',
	    
            data: api_result,
	    
            meta: {
		sourceUrl: sourceUrl,
		sourceName: 'GitHub',
		sourceIcon: true,
		itemType: 'Jobs'
            },
	    template_group: 'base',
            templates: {
		options: {
		    content: Spice.github_jobs.content
		},
		detail: false,
		item_detail: false
            }
	});
    };

    Handlebars.registerHelper("formatDate", function(created_at) {
	var date = new Date(created_at);
	var months = ["January", "February", "March", "April", "May", "June", "July", 
		      "August", "September", "October", "November", "December"];
	var month = months[date.getUTCMonth()];

	return month + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    });
}(this));
