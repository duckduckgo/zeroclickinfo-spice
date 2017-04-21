(function (env) {
    "use strict";

    env.ddg_spice_mo = function(api_result) {
        var script = $('[src*="/js/spice/mo/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/mo\/([^\/]+)/)[1];
        
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.results || api_result.results.length === 0) {
            return Spice.failed('mo');
        }

        // Render the response
        Spice.add({
            id: 'mo',

            // Customize these properties
            name: 'Answer',
            data: api_result.results,
            meta: {
                sourceName: 'Mo',
                sourceUrl: 'https://scad.ai',
                total: api_result.results,
                itemType: 'Learning Resources',
                searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                };
            },
            templates: {
                group: 'text',
                item_detail: false,
                detail: false       
            }
        });
    };
}(this));
