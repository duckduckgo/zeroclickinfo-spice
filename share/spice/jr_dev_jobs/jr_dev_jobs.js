(function(env) {
    'use strict';

    env.ddg_spice_jr_dev_jobs = function(api_result) {
        if (!api_result || !api_result.total_results > 0) {
            return Spice.failed('jr_dev_jobs');
        }

        Spice.add({
            id: 'jr_dev_jobs',
            name: 'Jobs',
            data: api_result.jobs,
            meta: {
                sourceName: 'Jr.DevJobs',
                sourceUrl: 'https://www.jrdevjobs.com/jobs?query=' + api_result.query,
                total: api_result.total_results,
                searchTerm: api_result.query,
                itemType: 'Jobs',
                sourceIconUrl: 'https://s3-us-west-2.amazonaws.com/jrdevsimages/jr-dev-jobs-logo-circle.png'
            },
            normalize: function(item) {
                return {
                    title: item.position,
                    subtitle: item.company_name,
                    description: item.snippet,
                    url: item.url
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.jr_dev_jobs.footer
                },
                variants: {
                    tile: 'wide',
                    tileTitle: '1line',
                    tileSnippet: 'large',
                    tileFooter: '2line'
                }
            }
        });
    };
}(this));
