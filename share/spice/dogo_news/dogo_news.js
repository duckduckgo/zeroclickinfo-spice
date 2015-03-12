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
                return {
                    title: item.name,
                    image: item.thumb,
                    img: item.thumb,
                    img_m: item.thumb,
                    heading: item.name,
                    rating: 'Unrated',
                    ratingText: (item.comments_count || 0) + ' comments',
                    url: item.url,
                    abstract: Handlebars.helpers.ellipsis(item.summary, 200)
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