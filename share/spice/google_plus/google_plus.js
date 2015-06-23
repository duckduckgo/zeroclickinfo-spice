(function (env) {
    "use strict";
    env.ddg_spice_google_plus = function(api_result){

        if(!api_result || !api_result.items || api_result.items.length === 0) {
            return Spice.failed("google_plus");
        }

        Spice.add({
            id: 'google_plus',
            name: 'Social',
            data: api_result.items,
            meta: {
                sourceName : 'Google+',
                sourceUrl : 'http://plus.google.com',
                itemType: "Google+ Profile" + (api_result.items.length > 1 ? 's' : '')
            },
            normalize : function(item) {
                var image = item.image.url.replace(/sz=50$/, "sz=100");
                return {
                    img: DDG.toHTTP(image),
                    heading: item.displayName
                };
            },
            templates: {
                group: 'products',
                item_detail: false,
                detail: false,
                options: {
                    rating: false
                },
                variants: {
                    tile: 'narrow'
                }
            }
        });
    };
}(this));
