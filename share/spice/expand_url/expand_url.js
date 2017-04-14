(function(env){
    "use strict";

    env.ddg_spice_expand_url = function(api_result) {

	    // Get original query.
        var script = $('[src*="/js/spice/expand_url/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/expand_url\/([^\/]+)/)[1];

        // Check if there are any errors.
        if (!api_result.success) {
            return Spice.failed('expand_url');
        }

        api_result.subtitle = "Expanded URL for: " + decodeURIComponent(query);

        // Display the plug-in.
        Spice.add({
            id: "expand_url",
            name: "Answer",
            data: api_result,
            meta: {
                sourceUrl: "https://unshorten.me?url=" + decodeURIComponent(query),
                sourceName: "unshorten.me"
            },
            templates: {
                group: 'text',
                options: {
                    title_content: Spice.expand_url.title_content
                }
            }
        });
    };
}(this));
