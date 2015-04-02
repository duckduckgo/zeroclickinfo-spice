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

        function minToMinHrs(runtime) {
            var hours = '',
                minutes = runtime;
            if (runtime >= 60) {
                hours = Math.floor(runtime / 60) + ' hr. ';
                minutes = (runtime % 60);
            }
            return hours + (minutes > 0 ? minutes + ' min.' : '');
        }
        
        Spice.add({
            id: 'dogo_movies',
            name: 'Kids Movies',
            data: api_result.results,
            meta: {
                sourceName: 'DOGOmovies',
                sourceUrl: 'http://www.dogomovies.com/search?query=' + encodeURIComponent(query) + '&ref=ddg',
                itemType: 'kids movies'
            },
            normalize: function(item) {
                var thumb = item.thumb;
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
                    abstract: item.summary,
                    runtime: minToMinHrs(item.runtime || 0)
                };
            },
            templates: {
                group: 'media',
                options: {
                    variant: 'poster',
                    buy: Spice.dogo_movies.buy,
                    subtitle_content: Spice.dogo_movies.subtitle_content,
                    rating: true
                }
            }
        });
    };
}(this));