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
    
        Spice.add({
            id: 'dogo_news',
            name: 'Kids News',
            data: api_result.results,
            meta: {
                sourceName: 'DOGOnews',
                sourceUrl: 'http://www.dogonews.com/search?query=' + encodeURIComponent(query) + '&ref=ddg',
                itemType: 'kids news articles'
            },
            normalize: function(item) {
                var thumb = item.hi_res_thumb || item.thumb;
                return {
                    title: item.name,
                    author: item.author,
                    image: thumb,
                    img: thumb,
                    img_m: thumb,
                    heading: item.name,
                    rating: 'Unrated',
                    ratingText: item.comments_count + ' comments',
                    url: item.url,
                    abstract: item.summary
                };
            },
            templates: {
                group: 'media',
                detail: 'products_detail',
                item_detail: 'products_item_detail',
                options: {
                    variant: 'poster',
                    buy: Spice.dogo_news.buy,
                    subtitle_content: Spice.dogo_news.subtitle_content,
                }
            }
        });
    };
}(this));