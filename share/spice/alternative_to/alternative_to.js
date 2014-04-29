(function(env) {
    "use strict";

    env.ddg_spice_alternative_to = function(api_result) {
        Spice.add({
            id: 'alternative_to',
            name: 'Alternative Software',
            data: api_result.Items,
            signal: 'high',
            meta: {
                searchTerm: api_result.Name,
                itemType: 'Alternatives',
                sourceUrl: 'http://alternativeto.net/',
                sourceName: 'AlternativeTo'
            },
            normalize: function(item) {
                return {
                    ShortDescription: DDG.strip_html(DDG.strip_href(item.ShortDescription)),
                    url: item.Url
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.alternative_to.content
                }
            }
        });
    };

    Handlebars.registerHelper("getPlatform", function (platforms) {
	if(!platforms) {
	    return "";
	}
        return (platforms.length > 1) ? "Multiplatform" : platforms[0];
    });

}(this)); 

