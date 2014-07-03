(function(env){    
    env.ddg_spice_expand_url = function(api_response) {
        "use strict";

    // Get original query.
        var script = $('[src*="/js/spice/expand_url/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/expand_url\/([^\/]+)/)[1];

        // Check if there are any errors.
        if (!api_response["long-url"] || api_response["long-url"] === query) {
            return Spice.failed('expand_url');
        }

        // Display the plug-in.
        Spice.add({
            id: "expand_url",
            name: "Answer",
            data: api_response,
            meta: {
                sourceUrl: "http://longurl.org/expand?url=" + query,
                sourceName: "LongURL"
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
