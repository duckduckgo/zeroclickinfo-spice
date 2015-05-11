(function(env) {
    "use strict";
    
    // A change in the Rotten Tomatoes API returns images that end in _tmb.
    // This changes this to _det.
    function toDetail(img) {
        if(/resizing\.flixster\.com/.test(img)) {
            // Everything before the size of the image can be removed and it would still work.
            img = img.replace(/.+\/\d+x\d+\/(.+)/, "http://$1");
            // Better use the _det size (which is smaller) instead of the _ori size.
            return img.replace(/_ori/, "_det");
        }
        
        // Otherwise, use the old string replacement strategy.
        return img.replace(/tmb\.(jpg|png)/, "det.$1");
    }
    
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
        var ratings = ["r","pg-13","pg","g","pg13","unrated"];

        // Check whether our query contains any rating
        $.each(ratings, function(index, value) {
            if(($.inArray(value, query_array)) !== -1) {
                if(value === "pg13") {
                    filter_rating = "pg-13";
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
                itemType: 'Movies'
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
                
                // Modify the image from _tmb.jpg to _det.jpg
                var image = toDetail(item.posters.detailed)
                
                if(item.alternate_ids && item.alternate_ids.imdb) {
                    return {
                        rating: item.ratings.critics_score >= 0 ? item.ratings.critics_score / 20 : 0,
                        //image: image,
                        icon_image: get_image(item.ratings.critics_rating),
                        abstract: Handlebars.helpers.ellipsis(item.synopsis, 200),
                        heading: item.title,
                        //img: image,
                        //img_m: image,
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
                }
            },
            onItemShown: function(item) {
                $.ajaxSetup({ cache: true });
                
                if(item.alternate_ids && item.alternate_ids.imdb) {
                    $.getJSON("/js/spice/movie_image/tt" + item.alternate_ids.imdb, function(data) {
                        if(data && data.movie_results && data.movie_results.length > 0 && data.movie_results[0].poster_path) {
                            var image = "https://image.tmdb.org/t/p/w185" + data.movie_results[0].poster_path;
                            item.$html.find(".tile__media__img").attr("src", "https://images.duckduckgo.com/iu/?f=1&u=" + encodeURIComponent(image));
                            $.extend(item, {
                                image: image,
                                img: image,
                                img_m: image
                            });
                        }
                    });
                }
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
