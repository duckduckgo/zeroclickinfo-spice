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
            name: 'DOGObooks',
            data: api_result.results,
            meta: {
                sourceName: 'DOGObooks',
                sourceUrl: 'http://www.dogobooks.com/search?query=' + encodeURIComponent(query),
                itemType: 'kids books'
            },
            normalize: function(item) {
                var thumb = (item.thumb ? item.thumb.replace(/SL160/, 'SL500') : null);
                var rating = (item.ratings && item.ratings.score ? item.ratings.score : 0);
                return {
                    title: item.name,
                    image: thumb,
                    img: thumb,
                    img_m: thumb,
                    heading: item.name,
                    rating: rating,
                    ratingText: rating,
                    reviewCount: (item.ratings && item.ratings.count ? item.ratings.count : 0),
                    url: item.url,
                    abstract: Handlebars.helpers.ellipsis(item.summary, 200)
                };
            },
            templates: {
                group: 'products',
                options: {
                    variant: 'poster',
                    buy: Spice.dogo_books.buy,
                    subtitle_content: Spice.dogo_books.subtitle_content,
                }
            }
        });
    };
}(this));