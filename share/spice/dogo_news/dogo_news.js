(function(env) {
    "use strict";

    env.ddg_spice_dogo_news = function(api_result) {
        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('dogo_news');
        }

        // Get original query.
        var script = $('[src*="/js/spice/dogo_news/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/dogo_news\/([^\/]+)/)[1]);

        var getFirstNameLastInitial = function(name) {
            return name.replace(/(.* )([A-Z])[^ ]+$/, '$1 $2.');
        };
        
        DDG.require('moment.js', function(){
            Spice.add({
                id: 'dogo_news',
                name: 'Kids News',
                data: api_result.results,
                meta: {
                    sourceName: 'DOGOnews',
                    sourceUrl: 'http://www.dogonews.com/search?query=' + encodeURIComponent(query),
                    itemType: 'Kids News Articles',
                    snippetChars: 150
                },
                normalize: function(item) {
                    var thumb = item.hi_res_thumb || item.thumb;
                    return {
                        title: item.name,
                        source: Handlebars.helpers.ellipsis(getFirstNameLastInitial(item.author), 10),
                        url: item.url,
                        excerpt: item.summary,
                        description: item.summary,
                        image: thumb,
                        relative_time: moment(item.published_at).fromNow()
                    };
                },
                templates:{
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.dogo_news.footer
                    },
                    variants: {
                        tileSnippet: "large"
                    },
                    elClass: {
                        tileFoot: "tx-clr--grey-light"
                    }
                }
            });
        });
    };
}(this));
