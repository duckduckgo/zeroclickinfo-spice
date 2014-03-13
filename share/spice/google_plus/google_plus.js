function ddg_spice_google_plus (api_result) {
    "use strict";

    if(!api_result || !api_result.items || api_result.items.length === 0) {
        return;
    }

    Spice.render({
        data: api_result,
        source_name : 'Google+',
        source_url : 'http://plus.google.com',
        header1 : "Google+ Users",
        spice_name: "google_plus",
        template_frame: "carousel",
        template_options: {
            items: api_result.items,
            template_item: "google_plus"
        },
        force_no_fold : 1
    });
};

Handlebars.registerHelper("changeURL", function(image) {
    "use strict";

    // Make the icon a little bigger.
    image = image.replace(/sz=50$/, "sz=100");

    // Change HTTPS to HTTP.
    return image.replace(/^https/, "http");
});
