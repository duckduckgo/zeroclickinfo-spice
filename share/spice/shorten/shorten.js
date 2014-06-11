function ddg_spice_shorten(api_result) {
    "use strict";
    // Exit immediately if we find an error message.
    if (!api_result || !api_result.shorturl || api_result.errorcode) {
        return;
    }
    if (// Check if it is a mobile browser (needs work). This was inspired by is.gd.
    api_result.mobile = !1, window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
        api_result.mobile = !0;
    }
    Spice.add({
        data: api_result,
        header1: "Shortened Link (is.gd)",
        sourceUrl: "http://is.gd/",
        sourceName: "is.gd",
        templates: {
            item: Spice.shorten.shorten,
            detail: Spice.shorten.shorten
        },
        favicon_style: "inline"
    });
    // If we displayed an input box, make sure we focus on it.
    var url = $("input#shorten-url");
    url.click(function() {
        url.focus().select();
    }).click();
}