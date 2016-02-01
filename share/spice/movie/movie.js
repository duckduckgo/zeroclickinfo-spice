(function(env) {
    "use strict";

    function get_image(critics_rating) {
        if (!critics_rating) {
            return;
        }

        // The filename is the same as the critics_rating, but
        // lowercased and with spaces converted to dashes.
        critics_rating = critics_rating.toLowerCase().replace(/ /, '-');
        return DDG.get_asset_path('in_theaters', critics_rating + ((DDG.is3x || DDG.is2x) ? '.retina.png' : '.png'));
    }

    env.ddg_spice_movie = function(api_result) {
        if (!api_result || !api_result.movies || !api_result.movies.length) {
            return Spice.failed('movie');
        }

        // Get original query.
        var script = $('[src*="/js/spice/movie/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/movie\/([^\/]+)/)[1]);

        //Remove parenthesis to match: Movie Name (2014)
        if (query.match(/\(.+?\)/g)) {
            query = query.replace(/\(|\)/g, '');
        }

        //Check if the query contains a year
        var year = query.match(/\d{4}/),
            singleResult = [];

        //Ensure year is vaild between 1900 - current year + 5
        year = (year >= 1900 && year <= new Date().getFullYear() + 5) ? year : null;


        if (year) {
            ///Check movie year and title against query
            $.each(api_result.movies, function(key, result) {
                if (!result.title.match(/\d{4}/)) { // don't run this check if the movie title contains a date
                    if (result.year == year && query.replace(year, '').trim() == result.title.toLowerCase()) {
                        singleResult.push(result);
                    }
                }
            });
            if (singleResult.length > 0) {
                api_result.movies = singleResult;
            } // return a single result if we have an exact match
        }

        Spice.add({
            id: 'movie',
            name: 'Movies',
            data: api_result.movies,
            meta: {
                searchTerm: query,
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'https://www.rottentomatoes.com/search/?search=' + query,
                rerender: [
                    'image'
                ]
            },
            normalize: function(item) {
                if(item.alternate_ids && item.alternate_ids.imdb) {
                    return {
                        rating: Math.max(item.ratings.critics_score / 20, 0),
                        icon_image: get_image(item.ratings.critics_rating),
                        abstract: Handlebars.helpers.ellipsis(item.synopsis || item.critics_consensus, 200),
                        heading: item.title,
                        fallback_image: item.posters.detailed,
                        image: null,
                        url: item.links.alternate,
                        is_retina: (DDG.is3x || DDG.is2x) ? "is_retina" : "no_retina"
                    };
                }
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.movie.subtitle_content,
                    buy: Spice.movie.buy
                },
                variants: {
                    productSub: 'noMax'
                },
                elClass: {
                    tileMediaImg: 'js-movie-img',
                    productMediaImg: 'js-movie-img'
                }
            },
            relevancy: {
                skip_words: ['movie', 'info', 'film', 'rt', 'rotten', 'tomatoes', 'rating', 'ratings', 'rotten'],
                primary: [{
                    key: 'title'
                }, {
                    key: 'posters.detailed',
                    match: /\.jpg$/,
                    strict: false
                }]
            },
            onItemShown: function(item) {
                if (!item.alternate_ids || !item.alternate_ids.imdb) { return; }

                $.ajaxSetup({ cache: true });

                $.getJSON("/js/spice/movie_image/tt" + item.alternate_ids.imdb, function(data) {
                    var path = data && data.movie_results && data.movie_results.length && data.movie_results[0].poster_path,
                        image = path && "https://image.tmdb.org/t/p/w185" + path;

                    item.set({
                        // fallback to lo-res:
                        image: image || item.fallback_image,

                        // don't fallback in detail pane because
                        // it looks silly with the tiny image:
                        img: image,
                        img_m: image
                    });
                });
            }
        });
    };

    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("movie_time", function(runtime) {
        var hours = '',
            minutes = runtime;
        if (runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }
        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });
}(this));
