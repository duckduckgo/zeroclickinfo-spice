function ddg_spice_maven(api_result) {
    if (api_result.responseHeader.status
        || api_result.response.numFound == 0) return
    
    Spice.render({
        data             : api_result,
        header1          : api_result.responseHeader.params.q
                            + " (Maven Central Repository)",
        source_url       : 'http://search.maven.org/#search%7Cga%7C1%7C'
                            + encodeURIComponent(api_result.responseHeader.params.q),
        source_name      : 'Maven Central Repository',
        template_normal  : 'maven',
        force_big_header : true,
        force_no_fold    : true
    });

    $("#zero_click_abstract").css({
        "margin": "4px 12px 0px 2px !important",
    });
}
