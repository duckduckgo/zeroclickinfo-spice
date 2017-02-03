(function (env) {
    'use strict';

    // This is needed to prevent jQuery from adding '_={timestamp}' to the end
    // of the URL, which breaks the call to getScript()
    $.ajaxSetup({ cache: true });

    var DETAIL_ENDPOINT = '/js/spice/movies/details/';
    var POSTER_URL = 'http://image.tmdb.org/t/p/w185';
    var MOVIE_URL = 'http://www.themoviedb.org/movie/';

    env.ddg_spice_movies_filmography = function(data) {
        // This isn't exactly pretty, but I can't think of any
        // more graceful way to handle this.
        var hasFailed = (
            !data ||
            !data.results ||
            !data.results[0] ||
            !data.results[0].id
        );

        if (hasFailed) {
            return Spice.failed('movies_filmography');
        }
        
        var castId = data.results[0].id;

        $.getJSON(DETAIL_ENDPOINT + castId, function(api_result) {
            var hasFailed = (
                !api_result ||
                !api_result.results ||
                !api_result.results.length
            );

            if (hasFailed) {
                return Spice.failed('movies_filmography');
            }

            DDG.require('moment.js', function() {
                Spice.add({
                    id: 'movies_filmography',
                    name: 'Movies',
                    data: api_result.results,
                    meta: {
                        sourceName: 'TheMovieDb',
                        sourceUrl: 'http://www.themoviedb.org/person/'
                            + castId,
                        primaryText: 'Showing ' + api_result.results.length + ' Movies'
                    },
                    normalize: function(item) {
                        var releaseDate = moment(
                            item.release_date,
                            'YYYY-MM-DD'
                        ).format('MMMM Do YYYY');
                        return {
                            heading: item.title + '(Released ' + releaseDate + ')',
                            url: MOVIE_URL + item.id,
                            rating: item.vote_average / 2, // normalize from 10 to 5 pt scale
                            reviewCount: item.vote_count,
                            brand: item.release_date,
                            abstract: item.overview,
                            image: POSTER_URL + item.poster_path,
                            img_m: POSTER_URL + item.poster_path,
                        };
                    },
                    templates: {
                        group: 'movies',
                        options: {
                            rating: true,
                            buy: Spice.movies_filmography.buy,
                        }
                    }
                });
            });
        });
    };
}(this));
