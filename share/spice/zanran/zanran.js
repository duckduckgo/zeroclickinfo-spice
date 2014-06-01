function ddg_spice_zanran(api_result) {
    "use strict";

    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var checkImage = function(image) {
        if(image) {
            return "/iu/?u=" + image;
        }
        return "";
    };

    Spice.add({
        data             : api_result,
        header1          : DDG.get_query() + " (Zanran)",
        sourceUrl       : api_result.more,
        sourceName      : 'Zanran',
        templates: {
            item: Spice.zanran.zanran,
            detail: Spice.zanran.zanran
        },
        image_url        : checkImage(api_result.results[0].preview_image),
        
        
    });

    $("a.show-hide").click(function() {
        var id = $(this).data("target");
        $(id).toggle();
    });

    $("#zero_click_abstract").css({
        "max-width" : "auto !important"
    });

    $("#zero_click_image img").css({
      "max-width"  : "71px",
      "max-height" : "100px", // A4 ratio
      "border"     : "1px solid black"
    });
};

Handlebars.registerHelper("preview_link", function() {
    "use strict";

    var s = this.preview_url;
    return (s.indexOf("zanran")) ? this.preview_url : "http://zanran.com" + this.preview_url;
});
