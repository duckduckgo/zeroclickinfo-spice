(function(env){
    "use strict";

    env.ddg_spice_expand_url = function(api_result) {

	    // Get original query.
        var script = $('[src*="/js/spice/expand_url/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/expand_url\/([^\/]+)/)[1];

        // Check if there are any errors.
        if (!api_result.org_url || api_result.error) {
            return Spice.failed('expand_url');
        }

        // Display the plug-in.
        Spice.add({
            id: "expand_url",
            name: "Answer",
            data: api_result,
            meta: {
                sourceUrl: "http://untiny.me/",
                sourceName: "Untiny"
            },
            normalize: function (item) {
                return {
                    title: item.org_url,
                    url: item.org_url,
                    description: "Expanded URL for: " + decodeURI(query)
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));