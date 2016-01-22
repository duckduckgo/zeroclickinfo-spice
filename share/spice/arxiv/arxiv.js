(function (env) {
    "use strict";
    env.ddg_spice_arxiv = function(api_result){
        var url = get_arxiv_rel_link( api_result.feed.entry.link );

        if (!api_result) {
            return Spice.failed('arxiv');
        }

        Spice.add({
            id: "arxiv",

            name: "Reference",
            data: api_result,
            meta: {
                sourceName: "arxiv.org",
                sourceUrl: url
            },
            normalize: function(item) {
                return {
                    title: sprintf( "%s (%s)",
                        item.feed.entry.title.text,
                        item.feed.entry.published.text.replace( /^(\d{4}).*/, "$1" )
                    ),
                    url: url,
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

        function get_arxiv_rel_link(links) {
            for ( var link in links ) {
                if ( links[link].rel === "alternate" && links[link].type === "text/html" ) {
                    return links[link].href;
                }
            }

            return links[0].href;
        }

    };
}(this));
