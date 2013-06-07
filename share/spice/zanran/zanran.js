function ddg_spice_zanran(api_result) {
    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var checkImage = function(image) {
        if(image) {
            return "/iu/?u=" + image;
        }
        return "";
    };

    Spice.render({
        data             : api_result,
        header1          : DDG.get_query() + " (Zanran)",
        source_url       : api_result.more,
        source_name      : 'Zanran',
        template_normal  : 'zanran',
        image_url        : checkImage(api_result.results[0].preview_image),
        force_big_header : true
    });

    $("a.show-hide").click(function() {
        var id = $(this).data("target");
        $(id).toggle();
    });

};

Handlebars.registerHelper("preview_link", function() {
    var s = this.preview_url;
    return (s.indexOf("zanran")) ? this.preview_url : "http://zanran.com" + this.preview_url;
});
