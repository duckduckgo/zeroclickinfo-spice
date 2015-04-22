(function(env) {
    "use strict";

    env.ddg_spice_dogo_books = function(api_result) {
        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('dogo_books');
        }

        // Get original query.
        var script = $('[src*="/js/spice/dogo_books/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/dogo_books\/([^\/]+)/)[1]);

        Spice.add({
            id: 'dogo_books',
            name: 'Kids Books',
            data: api_result.results,
            meta: {
                sourceName: 'DOGObooks',
                sourceUrl: 'http://www.dogobooks.com/search?query=' + encodeURIComponent(query) + '&ref=ddg',
                itemType: 'kids books'
            },
            normalize: function(item) {
                var thumb = item.hi_res_thumb || item.thumb;                
                return {
                    title: item.name,
                    image: thumb,
                    img: thumb,
                    img_m: thumb,
                    heading: item.name,
                    rating: item.ratings.score,
                    ratingText: item.comments_count,
                    reviewCount: item.comments_count,
                    url: item.url,
                    abstract: item.summary
                };
            },
            templates: {
                group: 'media',
                options: {
                    buy: Spice.dogo_books.buy,
                    rating: true
                },
                variants: {
                    tile: 'poster'
                }
            }
        });
    };
}(this));