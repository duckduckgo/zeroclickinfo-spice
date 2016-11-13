(function (env) {
    "use strict";

    env.ddg_spice_imdb_movies = function(api_result) {
        console.log(api_result);
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.Response == "False" || api_result.Error || !api_result.Search.length || !api_result.Search[0]) {
            return Spice.failed('imdb_movies');
        }

        // Get original query.
        var script = $('[src*="/js/spice/imdb_movies/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/imdb_movies\/([^\/]+)/)[1]);
            
        // Render the response
        Spice.add({
            id: 'imdb_movies',

            // Customize these properties
            name: 'Movies',
            data: api_result.Search,
            meta: {
                sourceName: 'IMDb',
                sourceUrl: 'http://www.imdb.com/find?ref_=nv_sr_fn&q=' + encodeURIComponent(query) + '&s=all',
                searchTerm: query,
                itemType: 'Movies'
            },
            normalize: function(item) {
                var movieAndYear = item.Title + " (" + item.Year + ")";

                var poster = item.Poster === "N/A" ? DDG.get_asset_path("imdb_movies","no_image_available.png") : item.Poster;
                return {
                    id: item.imdbID,
                    image: poster,
                    img: poster,
                    img_m: poster,
                    heading: movieAndYear,
                    url: 'http://www.imdb.com/title/' + item.imdbID,
                };
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.imdb_movies.subtitle_content,
                    buy: Spice.imdb_movies.buy,
                    rating: true,
                    moreAt: true,
                    ratingText: false
                }
            },
            onItemShown: function(item) {
                $.get( "http://www.omdbapi.com/?i="+item.imdbID, function( data ) {
                    console.log(data);
                    
                    var movieRating = parseFloat(data.imdbRating)/2.0;
                    
                    item.set({
                        // fallback to lo-res if call to get hi-res fails for some reason,
                        // at least lo-res is better than showing an empty white tile:
                        Director: data.Director,
                        Actors: data.Actors,
                        rating: movieRating,
                        reviewCount: data.imdbVotes,
                        Plot: data.Plot
                    });
                });
            }
        });
    };
}(this));