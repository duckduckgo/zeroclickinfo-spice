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

    Spice.render({
        data             : api_response,
        header1          : query + " (MetaCPAN)",
        source_url       : 'https://metacpan.org/' + link,
        source_name      : 'MetaCPAN',
        template_normal  : 'meta_cpan',
        force_big_header : true,
        force_no_fold    : true
    });
}
