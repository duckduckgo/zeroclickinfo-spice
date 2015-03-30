(function(env) {
    "use strict";

    env.ddg_spice_github_jobs = function(api_result) {

        if (!api_result) {
            return Spice.failed('github_jobs');
        }

        var jobs = api_result,
            query = DDG.get_query(),
            re = /(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?/;

        jobs['description'] = query.replace(re, "$1");
        jobs['location'] = query.replace(re, "$2");

        var sourceUrl = 'https://jobs.github.com/positions?description=' + encodeURIComponent(jobs['description']) + "&location=" + encodeURIComponent(jobs['location']);

        DDG.require('moment.js', function() {
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
                normalize: function(item) {
                    return {
                        title: item.title,
                        subtitle: item.company,
                        location: item.location,
                        description: $('<div/>').html(DDG.strip_html(item.description)).text(),
                        url: item.url,
                        created_at: moment(item.created_at).fromNow()
                    }
                },
                templates: {
                    group: 'text',
                    options: {
                        footer: Spice.github_jobs.footer
                    },
                    variants: {
                        tile: 'basic1',
                        tileFooter: '2line',
                    },
                    detail: false,
                    item_detail: false
                }
            });
        });
    };

    Handlebars.registerHelper("GitHubJobs_formatDate", function(created_at) {
        var date = new Date(created_at);
        var months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        var month = months[date.getUTCMonth()];

        return month + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    });
}(this));
