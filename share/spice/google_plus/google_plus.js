function ddg_spice_google_plus (api_result) {
    "use strict";

    if(!api_result || !api_result.items || api_result.items.length === 0) {
        return Spice.failed("googleplus");
    }

    Spice.add({
        id: 'googleplus',
        name: 'Google Plus',
        data: api_result.items,
        meta: {
            sourceName : 'Google+',
            sourceUrl : 'http://plus.google.com',
            itemType: "Google+ Profile" + (api_result.items.length > 1 ? 's' : '')
        },
        templates: {
            group: 'base',
            detail: false,
            options: {
                content: Spice.google_plus.content
            }
        },
        normalize : function(item){
            // change image size and https -> http
            var image = item.image.url.replace(/sz=50$/, "sz=100");
            return{
                image : image.replace(/^https/, "http")
            };
        }
    });
};