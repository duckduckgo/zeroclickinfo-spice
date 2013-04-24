function ddg_spice_zanran(api_result) {
    if(!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    api_result.firstResult = api_result.results[0];
    api_result.otherResults = api_result.results.splice(1, api_result.results.length);
    Spice.render({
        data             : api_result,
        header1          : 'Data & Statistics from Zanran',
        source_url       : api_result.more,
        source_name      : 'Zanran',
        template_normal  : 'zanran',
        force_big_header : true
    });

    $("a.show-hide").click(function() {
        var id = $(this).data("target");
        $(id).toggle();
    });
};