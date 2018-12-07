(function (env) {
    "use strict";
    env.ddg_spice_thumbtack = function(api_result){

        if (!api_result || api_result.error || !api_result.data || !api_result.data.length) {
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

                    return {
                        // Street-level Addresses are private to most professionals,
                        // so we instead show a description of the service.
                        address: item.description,
                        image: DDG.toHTTP(item.image)
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
