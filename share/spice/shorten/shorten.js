function ddg_spice_shorten(api_result) {
    "use strict";

    // Exit immediately if we find an error message.
    if (!api_result || !api_result.shorturl || api_result.errorcode) {
        return;
    }

    // Check if it is a mobile browser (needs work). This was inspired by is.gd.
    api_result.mobile = false;
    if(window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
        api_result.mobile = true;
    }

    Spice.render({
        data             : api_result,
        header1          : "Shortened Link (is.gd)",
        source_url       : "http://is.gd/",
        source_name      : "is.gd",
        template_normal  : "shorten",
        force_big_header : true,
        favicon_style    : "inline"
    });

    // If we displayed an input box, make sure we focus on it.
    var url = $("input#shorten-url");
    url.click(function() {
        url.focus().select();
    }).click();
}