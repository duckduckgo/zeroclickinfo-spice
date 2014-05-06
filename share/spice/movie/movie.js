(function(env) {
    "use strict";

    env.ddg_spice_movie = function(api_result) {
        Spice.add({
            id: 'movie',
            name: 'Movies',
            data: api_result.movies,
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
                itemType: 'Movies'
            },
            normalize: function(item) {
                return {
                    rating: Math.max(item.ratings.critics_score / 20, 0),
                    image: item.posters.detailed
                };
            },
            templates: {
                item: 'basic_image_item',
                detail: Spice.movie.movie_detail,
                options: {
                    tileClass: 'tile--b--i--mov  tile--c--n'
                }
            },
            relevancy: {
                skip_words: [
                    'movie',
                    'info',
                    'film',
                    'rt',
                    'rotten',
                    'tomatoes',
                    'rating',
                    'ratings',
                    'rotten'
                ],
                primary: [
                    { key: 'title' },
                    { key: 'posters.detailed', match: /_det\.jpg$/, strict: false }
                ]
            }
        });
    };

    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("time", function(runtime) {
        var hours = '',
            minutes = runtime;

        if(runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }

        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });

}(this));
