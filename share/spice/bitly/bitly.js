function ddg_spice_bitly(api_result) {
    "use strict";

    // Exit immediately if we find an error message.
    if (!api_result || api_result.status_code !== 200 || !api_result.data || !api_result.data.url) {
        return;
    }

    // Check if it is a mobile browser (needs work). This was inspired by is.gd.
    api_result.data.mobile = false;
    if(window.navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
        api_result.data.mobile = true;
    }

    Spice.render({
        data             : api_result.data,
        header1          : "Shortened Link (Bitly)",
        source_url       : api_result.data.url + "+",
        image_url        : "https://duckduckgo.com/iu/?u=http://i.imgur.com/xVpFr.png",
        source_name      : "Bit.ly",
        template_normal  : "bitly",
        force_big_header : true
    });

    var selectText = function(url) {
        url.focus().select();
    };

    // If we displayed an input box, make sure we focus on it.
    var url = $("input#bitly-url");
    selectText(url);
    url.click(function() {
        selectText(url);
    });
}
