(function (env) {
    "use strict";

    env.ddg_spice_renego_job_search = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.responseData
                || !api_result.responseData.jobs || !api_result.responseData.jobs.length) {
            return Spice.failed('renego_job_search');
        }

        var responseData = api_result.responseData;
        var queryParams = responseData.qparams;

        DDG.require('moment.js', function(){
            // Render the response
            Spice.add({
                id: "renego_job_search",
                name: "Renego Job Search",
                data: responseData.jobs,
                meta: {
                    sourceName: "Renego",
                    sourceUrl: 'https://www.renego.de/?w=' + encodeURIComponent(queryParams.w) + '&l=' + encodeURIComponent(queryParams.l) + '&cid=duckduckgo&csid=label'
                },
                normalize: function(item) {
                    return {
                        // customize as needed for your chosen template
                        title: item.title,
                        subtitle: item.job_company_name,
                        description: DDG.strip_html(item.description_short),
                        url: item.host + item.url_its,
                        location: item.location_name,
                        relativeTime: moment(item.inserted).fromNow()
                    };
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.renego_job_search.footer
                    },
                    variants: {
                        tileTitle: '2line',
                        tileSnippet: 'large',
                        tileFooter: '2line'
                    }
                }
            });
        });
    };
}(this));
