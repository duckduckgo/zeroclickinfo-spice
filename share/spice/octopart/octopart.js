var ddg_spice_octopart = function(api_result) {

    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var matched, result, query;
    $("script").each(function() {
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/octopart\/(.+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    Spice.render({
        data: api_result,
        source_name : 'Octopart',
        source_url : 'http://octopart.com/partsearch#search/requestData&q=' + query,
        header1 : api_result.request.q + " (Octopart)",
        template_frame: "carousel",
        template_normal: "octopart",
        carousel_css_id: "octopart",
        carousel_template_detail: "octopart_details",
        carousel_items: api_result.results,
        force_no_fold : 1
    });
};

Handlebars.registerHelper("toFixed", function(number) {
    return number.toFixed(2);
});