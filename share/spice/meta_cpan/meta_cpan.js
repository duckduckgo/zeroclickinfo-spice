(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        if (!(api_result && api_result.author && api_result.version)) {
            return;
        }

        var query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpanm?)\s*/i, '').replace(/-/g, '::');
        var link = "search?q=" + encodeURIComponent(query);
        if (api_result.module && api_result.module.length > 0 && api_result.module[0].associated_pod) {
            link = "module/" + api_result.module[0].associated_pod;
        }

        Spice.add({
            id: "meta_cpan",
            name: "MetaCPAN",
            data: api_result,
            meta: {
                sourceName: "MetaCPAN",
                sourceUrl: 'https://metacpan.org/' + link
            },
            templates: {
                group: 'info',
                options: {
                    content: 'record'
                }
            },
            normalize: function(item){
                return{
                    record_keys: ['abstract','author','version','description']
                };
            }
        });
    }
}(this));
