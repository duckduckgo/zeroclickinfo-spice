(function(env) {
    env.ddg_spice_meta_cpan = function(api_response) {
        "use strict";

        if (!(api_response && api_response.author && api_response.version)) {
            return;
        }

        var query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpanm?)\s*/i, '').replace(/-/g, '::');
        var link = "search?q=" + encodeURIComponent(query);
        if (api_response.module && api_response.module.length > 0 && api_response.module[0].associated_pod) {
            link = "module/" + api_response.module[0].associated_pod;
        }

        api_response.sourceUrl = 'https://metacpan.org/' + link;
        api_response.sourceName = "MetaCPAN";

        Spice.add({
            id: "meta_cpan",
            name: "MetaCPAN",
            data: api_response,
            templates: {
                detail: Spice.meta_cpan.detail
            }
        });
    }
}(this));