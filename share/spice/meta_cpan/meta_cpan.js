function ddg_spice_meta_cpan(api_response) {
    "use strict";

    if (!(api_response.author && api_response.version)) {
        return;
    }

    var query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpanm?)\s*/i, '').replace(/-/g, '::');
    var link = "search?q=" + encodeURIComponent(query);
    if (api_response.module && api_response.module.length > 0 && api_response.module[0].associated_pod) {
        link = "module/" + api_response.module[0].associated_pod;
    }

    Spice.add({
        data             : api_response,
        header1          : query + " (MetaCPAN)",
        sourceUrl       : 'https://metacpan.org/' + link,
        sourceName      : 'MetaCPAN',
        templates: {
            item: Spice.meta_cpan.meta_cpan,
            detail: Spice.meta_cpan.meta_cpan
        },
        
        
    });
}
