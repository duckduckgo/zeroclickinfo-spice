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
            name: 'Learn with Mo',
            data: api_result.results,
            meta: {
                sourceName: 'Mo | Powered by SCAD AI',
                sourceUrl: 'https://scad.ai',
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
