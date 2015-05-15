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

        DDG.require('moment.js', function(){
            Spice.add({
                id: 'dogo_news',
                name: 'Kids News',
                data: api_result.results,
                meta: {
                    sourceName: 'DOGOnews',
                    sourceUrl: 'http://www.dogonews.com/search?query=' + encodeURIComponent(query),
                    itemType: 'kids news articles'
                },
                normalize: function(item) {
                    var thumb = item.hi_res_thumb || item.thumb;
                    return {
                        title: item.name,
                        source: item.author,
                        url: item.url,
                        excerpt: item.summary,
                        image: thumb,
                        relative_time: moment(item.published_at).fromNow()
                    };
                },
                templates:{
                    item: 'news_item'
                }
            });
        });
    };
}(this));