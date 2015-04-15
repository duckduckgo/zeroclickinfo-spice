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

        var sourceUrl = 'https://jobs.github.com/positions?description=' + jobs['description'] + "&location=" + jobs['location'];
        var classes = {
            'Part Time': 'github_jobs__part_time',
            'Contract': 'github_jobs__contract'
        }

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
                    var created_at = moment(item.created_at);
                    return {
                        title: item.title,
                        subtitle: item.company,
                        location: item.location,
                        description: $('<div/>').html(DDG.strip_html(item.description)).text(),
                        url: item.url,
                        type: item.type,
                        status_class: item.type === 'Full Time' ? '' : classes[item.type],
                        created_at: (created_at.diff(moment(), 'days') >= -3) ? 'NEW' : created_at.format('MMM D')
                    }
                },
                templates: {
                    group: 'text',
                    options: {
                        footer: Spice.github_jobs.footer
                    },
                    variants: {
                        tileFooter: '2line',
                        tileSnippet: 'large',
                        tileTitle: '2line',
                    },
                    detail: false,
                    item_detail: false
                }
            });
        });
    };
}(this));
