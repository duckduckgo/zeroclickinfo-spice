(function(env) {
    "use strict";

    env.ddg_spice_alternative_to = function(api_result) {

        if (!api_result || !api_result.Items) {
            return Spice.failed('alternative_to');
        }

        Spice.add({
            id: 'alternative_to',
            name: 'Software',
            data: $.map(api_result.Items, function(o, idx) {
              o.ShortDescription = DDG.strip_html(o.ShortDescription);
              return o;
            }),
            signal: 'high',
            meta: {
                searchTerm: api_result.Name,
                itemType: 'Alternatives',
                sourceUrl: api_result.Url,
                sourceName: 'AlternativeTo'
            },
            normalize: function(item) {
                return {
                    description: DDG.unescape(DDG.strip_html(item.ShortDescription)),
                    url: item.Url,
                    icon: item.IconUrl,
                    title: item.Name,
                };
            },
            templates: {
                group: 'icon',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.alternative_to.footer,
                },
                variants: {
                    tileSnippet: "large"
                }
            }
        });
    };

    Handlebars.registerHelper("AlternativeTo_getPlatform", function (platforms) {
        return (platforms.length > 1) ? "Multiplatform" : platforms[0];
    });

}(this)); 
