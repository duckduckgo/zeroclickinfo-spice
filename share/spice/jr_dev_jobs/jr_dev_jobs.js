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
        sourceUrl: api_result.query_url
      },
      normalize: function(item) {
        return {
          url: item.url,
          title: item.position,
          subtitle: item.company_name,
          description: item.snippet
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
