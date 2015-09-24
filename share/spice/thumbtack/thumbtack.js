(function (env) {
    "use strict";
    env.ddg_spice_thumbtack = function(api_result){

        // Don't show anything if we weren't able to return 2 or more services.
        // In future iterations, we should support a different view in the case
        // of a single result.
        if (!api_result || api_result.error || api_result.data.length < 2) {
            return Spice.failed('thumbtack');
        }

        // Render the response
        DDG.require('maps', function() {
            Spice.add({
                id: "thumbtack",

                name: "Professionals",
                data: api_result.data,
                model: 'Place',
                view: 'Places',
                normalize: function(item) {

                    // Duckduckgo currently doesn't support caching https images,
                    // so convert them to http for now until this is resolved.
                    var img_url = item.image;
                    if (img_url) {
                        img_url = img_url.replace('https', 'http');
                    }
                    return {
                        // Street-level Addresses are private to most professionals,
                        // so we instead show a description of the service.
                        address: item.description,
                        image: img_url
                    };
                },
                meta: {
                    sourceName: "Thumbtack",
                    sourceUrl: 'https://thumbtack.com/'+ api_result.landing_page_endpoint,
                    itemType: "Showing " + api_result.data.length + " " + api_result.plural_taxonym
                },
                templates: {
                    group: 'places'
                }
            });
        });
    };
}(this));
