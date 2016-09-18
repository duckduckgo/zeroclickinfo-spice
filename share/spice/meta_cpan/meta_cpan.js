(function(env) {
    env.ddg_spice_meta_cpan = function(api_result) {
        "use strict";

        var script = $('[src*="/js/spice/meta_cpan/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/meta_cpan\/([^\/]*)/)[1];

        if ( !api_result || api_result.hits.hits.length < 1 ) {
            return DDH.failed('meta_cpan');
        }

        DDG.require('moment.js', function() {
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
                    if ( !item._source.module || !item._source.module[0] ||
                         ( !item.fields.description && !item.fields["abstract.analyzed"] )
                    ) {
                        return null;
                    }

                    var description = item.fields.description[0] || item.fields["abstract.analyzed"][0];
                    var version = item._source.module[0].version;
                    var date = ( item.fields.date && item.fields.date[0] )
                        ? moment(item.fields.date[0]).format("DD MMM YYYY")
                        : "";

                    return {
                        title: item._source.module[0].name,
                        url: 'https://metacpan.org/pod/' + item._source.module[0].name,
                        description: description,
                        author: item.fields.author[0],
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
            })
        });
    };
}(this));
