(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        if ( !api_result || api_result.hits.hits.length < 1 ) {
            return DDH.failed('meta_cpan');
        }

        Spice.add({
            id: "meta_cpan",
            name: "Software",
            data: {
                title: module_name,
                subtitle: api_result.abstract,
                record_data: api_result,
                record_keys: ['author','version','description']
            },
            meta: {
                sourceName: "MetaCPAN",
                sourceUrl: 'https://metacpan.org/' + link
            },
            templates: {
                group: 'list',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    };
}(this));
