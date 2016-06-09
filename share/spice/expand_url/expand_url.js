(function(env){    
    env.ddg_spice_expand_url = function(api_response) {
        "use strict";

        // Get original query.
        var script = $('[src*="/js/spice/expand_url/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/expand_url\/([^\/]+)/)[1];

        // Check if there are any errors.
        if (!api_response || !api_response["url"]) {
            return Spice.failed('expand_url');
        }

        // Display the plug-in.
        Spice.add({
            id: "expand_url",
            name: "Answer",
            data: api_response,
            meta: {
                sourceUrl: "http://expandurl.com/api/v1/?url=" + query,
                sourceName: "ExpandURL"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.expand_url.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
