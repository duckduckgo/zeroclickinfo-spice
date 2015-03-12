(function(env) {
    "use strict";

    env.ddg_spice_dogo_movies = function(api_result) {
        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('dogo_movies');
        }

        // Get original query.
        var script = $('[src*="/js/spice/dogo_movies/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/dogo_movies\/([^\/]+)/)[1]);

        Spice.add({
            id: 'dogo_movies',
            name: 'Kids Movies',
            data: api_result.results,
            meta: {
                sourceName: 'DOGOmovies',
                sourceUrl: 'http://www.dogomovies.com/search?query=' + encodeURIComponent(query),
                itemType: 'kids movies'
            },
            normalize: function(item) {
                var defaultThumb = '//cdn.dogomedia.com/assets/movies/poster_default-a477e7ae72341ae25e2036d6f4708f27.png';
                var thumb = item.thumb && 0 < item.thumb.length ? item.thumb : defaultThumb;
                var rating = (item.ratings && item.ratings.score ? item.ratings.score : 0);
                return {
                    title: item.name,
                    image: thumb,
                    img: thumb,
                    img_m: thumb,
                    heading: item.name,
                    rating: rating,
                    ratingText: (item.ratings && item.ratings.count ? item.ratings.count : 0) + ' reviews',
                    reviewCount: (item.ratings && item.ratings.count ? item.ratings.count : 0),
                    url: item.url,
                    abstract: Handlebars.helpers.ellipsis(item.summary, 200)
                };
            },
            templates: {
                group: 'media',
                options: {
                    variant: 'poster',
                    buy: Spice.dogo_movies.buy,
                    subtitle_content: Spice.dogo_movies.subtitle_content,
                }
            }
        });
    };
}(this));