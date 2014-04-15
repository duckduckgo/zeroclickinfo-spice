(function(env){    
    env.ddg_spice_expand_url = function(api_response) {
        "use strict";

        // Get the orignal query.
        var query = DDG.get_query().replace(/expand\s*/i, "");

        // Check if there are any errors.
        if (!api_response["long-url"] || api_response["long-url"] === query) {
            return;
        }

        // Display the plug-in.
        Spice.add({
            id: "expand_url",
            name: "Expand URL",
            data: api_response,
            meta: {
                itemType: "Expand Link (LongURL)",
                sourceUrl: "http://longurl.org/expand?url=" + encodeURIComponent(query),
                sourceName: "LongURL"
            },
            templates: {
                detail: Spice.expand_url.detail
            }
        });
    }
}(this));