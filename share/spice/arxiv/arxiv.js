(function (env) {
    "use strict";
    env.ddg_spice_arxiv = function(api_result){

        if (!api_result) {
            return Spice.failed('arxiv');
        }

        Spice.add({
            id: "arxiv",

            name: "Reference",
            data: api_result,
            meta: {
                sourceName: "arxiv.org",
                sourceUrl: api_result.feed.entry.link[0].href
            },
            normalize: function(item) {
                return {
                    title: sprintf( "%s (%s)",
                        item.feed.entry.title.text,
                        item.feed.entry.published.text.replace( /^(\d{4}).*/, "$1" )
                    ),
                    url: item.feed.entry.link[0].href,
                    subtitle: item.feed.entry.author.map( function(e) {
                        return e.name.text;
                    } ).join(', '),
                    description: item.feed.entry.summary.text
                };
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
