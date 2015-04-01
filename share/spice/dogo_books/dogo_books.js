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
                    ratingText: item.comments_count + ' reviews',
                    reviewCount: item.comments_count,
                    url: item.url,
                    abstract: Handlebars.helpers.ellipsis(item.summary, 200)
                };
            },
            templates: {
                group: 'media',
                options: {
                    variant: 'poster',
                    buy: Spice.dogo_books.buy,
                    subtitle_content: Spice.dogo_books.subtitle_content,
                }
            }
        });
        
        // Hide the bottom text so that the poster occupies the whole tile.
        if(typeof Spice.getDOM('dogo_books') !== 'undefined') {
            Spice.getDOM('dogo_books').find('.tile__body').addClass('is-hidden');
        }
    };
}(this));