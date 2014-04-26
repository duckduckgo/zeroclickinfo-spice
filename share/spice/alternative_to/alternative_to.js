(function(env) {
    "use strict";

    env.ddg_spice_alternative_to = function(api_result) {
        Spice.add({
            id: 'alternative_to',
            name: 'Alternative Software',
            data: api_result.Items,
            meta: {
                searchTerm: api_result.Name,
                itemType: 'Alternatives',
                sourceUrl: 'http://alternativeto.net/',
                sourceName: 'AlternativeTo',
            },
            templates: {
                item: Spice.alternative_to.item,
            }
        });
    };

    Handlebars.registerHelper("getPlatform", function (platforms) {

        return (platforms.length > 1) ? "Multiplatform" : platforms[0];
    });

}(this));
