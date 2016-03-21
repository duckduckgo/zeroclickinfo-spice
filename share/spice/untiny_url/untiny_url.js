(function(env){    
    env.ddg_spice_untiny_url = function(api_result) {
        "use strict";

	    // Get original query.
        var script = $('[src*="/js/spice/untiny_url/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/untiny_url\/([^\/]+)/)[1];

        // Check if there are any errors.
        if (!api_result.org_url || api_result.error) {
            return Spice.failed('untiny_url');
        }

        // Display the plug-in.
        Spice.add({
            id: "untiny_url",
            name: "Answer",
            data: api_result,
            meta: {
                sourceUrl: "http://untiny.me/",
                sourceName: "Untiny"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.untiny_url.content,
                }
            }
        });
    };
}(this));