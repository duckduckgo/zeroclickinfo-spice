(function(env) {
    "use strict";
    
    function get_image(critics_rating) {
        if(!critics_rating) {
            return;
        }
        // The filename is the same as the critics_rating, but
        // lowercased and with spaces converted to dashes.
        critics_rating = critics_rating.toLowerCase().replace(/ /, '-');
        return DDG.get_asset_path('in_theaters', critics_rating + ((DDG.is3x || DDG.is2x) ? '.retina.png' : '.png'));
    }
    
    env.ddg_spice_in_theaters = function(api_result) {
        if(!api_result || api_result.error) {
            return Spice.failed('in_theaters');
        }

        var mod_api_result = [];
        var filter_rating;
        var query_array = DDG.get_query().toLowerCase().split(" ");
        var ratings = ["r","pg-13","pg","g","pg13","kids","unrated"];

        // Check whether our query contains any rating
        $.each(ratings, function(index, value) {
            if(($.inArray(value, query_array)) !== -1) {
                if(value === "pg13") {
                    filter_rating = "pg-13";
                } else if (value === "kids") {
                    filter_rating = "g";
                } else {
                    filter_rating = value;
                }
            }
        });

        Spice.add({
            id: 'in_theaters',
            name: 'Movies',
            data: api_result.movies,
            signal: 'high',
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
                total: api_result.movies,
                primaryText: 'Now Playing in Theaters',
                rerender: [
                    'image'
                ]
            },
            normalize: function(item) {
                if (filter_rating && item.mpaa_rating.toLowerCase() !== filter_rating) {
                    return null;
                }

                var position;
                
                // We add these so that we can position the Rotten Tomatoes images.
                if(item.ratings.critics_rating === "Fresh" || item.ratings.critics_rating === "Certified Fresh") {
                    position = "-256px -144px";
                } else if(item.ratings.critics_rating === "Rotten") {
                    position = "-272px -144px";
                }
                
                if(item.alternate_ids && item.alternate_ids.imdb) {
                    return {
                        rating: item.ratings.critics_score >= 0 ? item.ratings.critics_score / 20 : 0,
                        icon_image: get_image(item.ratings.critics_rating),
                        abstract: Handlebars.helpers.ellipsis(item.synopsis, 200),
                        heading: item.title,
                        fallback_image: item.posters.detailed,
                        image: null,
                        url: item.links.alternate,
                        is_retina: ((DDG.is3x || DDG.is2x) ? 'is_retina' : 'no_retina')
                    };
                }
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.in_theaters.subtitle_content,
                    rating: false,
                    buy: Spice.in_theaters.buy
                },
                variants: {
                    productSub: 'noMax'
                },
                elClass: {
                    tileMediaImg: 'js-movie-img',
                    productMediaImg: 'js-movie-img'
                }
            },
            onItemShown: function(item) {
                var id = item.alternate_ids && item.alternate_ids.imdb;

                if (!id) { return; }

                $.ajaxSetup({ cache: true });

                $.getJSON("/js/spice/movie_image/tt" + id, function(data) {
                    var path = data && data.movie_results && data.movie_results.length && data.movie_results[0].poster_path,
                        image = path && "https://image.tmdb.org/t/p/w185" + path;

                    item.set({
                        // fallback to lo-res if call to get hi-res fails for some reason,
                        // at least lo-res is better than showing an empty white tile:
                        image: image || item.fallback_image,

                        // don't fall back on detail pane because it looks silly
                        // with the tiny image
                        img: image,
                        img_m: image
                    });
                });
            }
        });
    }
    
    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("InTheaters_time", function(runtime) {
        var hours = '',
            minutes = runtime;
        if(runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }
        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });
}(this));
