(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        if ( !api_result || api_result.hits.hits.length < 1 ) {
            return DDH.failed('meta_cpan');
        }

        Spice.add({
            id: "meta_cpan",
            name: "Software",
            data: api_result.hits.hits,
            meta: {
                itemType: 'Software',
                sourceName: 'MetaCPAN'
            },
            normalize: function(item) {
                if ( !item.fields.module || !item.fields.module[0] ) {
                    return null;
                }
                return {
                    title: item.fields.module[0].name,
                    url: 'https://metacpan.org/pod/' + item.fields.module[0].name,
                    description: item.fields.description
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
            }
        });
    };
}(this));
