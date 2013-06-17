function ddg_spice_google_plus (api_result) {

    if(!api_result || !api_result.items || api_result.items.length === 0) {
        return;
    }

    Spice.render({
        data: api_result,
        source_name : 'Google+',
        source_url : 'http://plus.google.com',
        header1 : "Google+ Users",
        template_frame: "carousel",
        template_normal: "google_plus",
        carousel_css_id: "google_plus",
        carousel_items: api_result.items,
        force_no_fold : 1
    });
};

Handlebars.registerHelper("changeSize", function(image) {
    return image.replace(/sz=50$/, "sz=100");
});