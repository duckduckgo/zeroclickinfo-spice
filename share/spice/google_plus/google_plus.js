function ddg_spice_google_plus (api_result) {

    if(!api_result || !api_result.items || api_result.items.length === 0) {
        return;
    }

    Spice.add({
        data: api_result,
        sourceName : 'Google+',
        sourceUrl : 'http://plus.google.com',
        header1 : "Google+ Users",
        id: "google_plus",
        view: "Tiles",
        template_options: {
            items: api_result.items,
            template_item: "google_plus"
        },
        
    });
};

Handlebars.registerHelper("changeURL", function(image) {
    // Make the icon a little bigger.
    image = image.replace(/sz=50$/, "sz=100");

    // Change HTTPS to HTTP.
    return image.replace(/^https/, "http");
});

