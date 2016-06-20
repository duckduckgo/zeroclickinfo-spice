(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        var script = $('[src*="/js/spice/meta_cpan/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/meta_cpan\/([^\/]*)/)[1];

        if ( !api_result || api_result.hits.hits.length < 1 ) {
            return DDH.failed('meta_cpan');
        }

        Spice.add({
            id: "meta_cpan",
            name: "Software",
            data: api_result.hits.hits,
            meta: {
                itemType: 'Software',
                sourceName: 'MetaCPAN',
                sourceUrl: 'https://metacpan.org/search?size=50&search_type=modules&q=' + encodeURIComponent(query)
            },
            normalize: function(item) {
                if ( !item.fields.module || !item.fields.module[0] ||
                     ( !item.fields.description && !item.fields.abstract )
                ) {
                    return null;
                }

                var description = item.fields.description || item.fields.abstract;
                var version = item.fields.version || item.fields.module[0].version
                var date = ( item.fields.date )
                    ? new Date(item.fields.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric' }
                        )
                    : ""

                return {
                    title: item.fields.module[0].name,
                    url: 'https://metacpan.org/pod/' + item.fields.module[0].name,
                    description: description,
                    author: item.fields.author,
                    version: version,
                    date: date
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.meta_cpan.footer
                },
                variants: {
                    tile: 'basic4'
                }
            }
        });
    };
}(this));
