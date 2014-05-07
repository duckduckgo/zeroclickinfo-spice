function ddg_spice_maven(api_result) {
    "use strict";

    if (api_result.responseHeader.status
        || api_result.response.numFound == 0) {
        return Spice.failed('maven');
    }
    
    Spice.add({
        data             : api_result,
        header1          : api_result.responseHeader.params.q
                            + " (Maven Central Repository)",
        sourceUrl       : 'http://search.maven.org/#search%7Cga%7C1%7C'
                            + encodeURIComponent(api_result.responseHeader.params.q),
        sourceName      : 'Maven Central Repository',
        templates: {
            item: Spice.maven.maven,
            detail: Spice.maven.maven
        },
        
        
    });

    $("#zero_click_abstract").css({
        "margin": "4px 12px 0px 2px !important",
    });
}
