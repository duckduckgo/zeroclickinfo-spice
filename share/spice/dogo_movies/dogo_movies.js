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
                    buy: Spice.dogo_movies.buy,
                    subtitle_content: Spice.dogo_movies.subtitle_content,
                }
            }
        });
    };
    
    // Convert minutes to hr. min. format.
    // e.g. {{dogo_movies_convert_minutes_to_hr_min 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("dogo_movies_convert_minutes_to_hr_min", function(runtime) {
        var hours = '',
            minutes = runtime;
        if (runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }
        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });
}(this));