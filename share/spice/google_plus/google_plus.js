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
            header1 : "Google+ Users"
        },
        templates: {
            group: 'base',
            detail: null,
            options: {
                content: Spice.google_plus.content
            }
        }
    });
};

Handlebars.registerHelper("changeURL", function(image) {
    "use strict";

    // Make the icon a little bigger.
    image = image.replace(/sz=50$/, "sz=100");

    // Change HTTPS to HTTP.
    return image.replace(/^https/, "http");
});
