(function(env) {
    "use strict";
    
    // A change in the Rotten Tomatoes API returns images that end in _tmb.
    // This changes this to _det.
    function toDetail(img) {
        return img.replace(/tmb\.(jpg|png)/, "det.$1");
    }
    
    function get_image(critics_rating) {
        if(!critics_rating) {
            return;
        }
        
        // The filename is the same as the critics_rating, but
        // lowercased and with spaces converted to dashes.
        critics_rating = critics_rating.toLowerCase().replace(/ /, '-');
        if(is_retina) {
            return DDG.get_asset_path('in_theaters', critics_rating + '.retina.png');
        } else {
            return DDG.get_asset_path('in_theaters', critics_rating + '.png');
        }
    }
    
    env.ddg_spice_movie = function(api_result) {
        if(!api_result || !api_result.movies || !api_result.movies.length) {
            return Spice.failed('movie');
        }
        
        // Get original query.
        var script = $('[src*="/js/spice/movie/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/movie\/([^\/]+)/)[1];
        
        Spice.add({
            id: 'movie',
            name: 'Movies',
            data: api_result.movies,
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'https://www.rottentomatoes.com/search/?search=' + query,
                itemType: 'Movies'
            },
            normalize: function(item) {
                
                // Modify the image from _tmb.jpg to _det.jpg
                var image = toDetail(item.posters.detailed);
                return {
                    rating: Math.max(item.ratings.critics_score / 20, 0),
                    image: image,
                    icon_image: get_image(item.ratings.critics_rating),
                    abstract: Handlebars.helpers.ellipsis(item.synopsis || item.critics_consensus, 200),
                    heading: item.title,
                    img_m: image,
                    url: item.links.alternate,
                    is_retina: is_retina ? "is_retina" : "no_retina"
                };
            },
            templates: {
                group: 'media',
                detail: 'products_item_detail',
                options: {
                    variant: 'poster',
                    subtitle_content: Spice.movie.subtitle_content,
                    buy: Spice.movie.buy
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
            }
        });
        
        // Make sure we hide the title and ratings.
        // It looks nice to show only the poster of the movie.
        var $dom = Spice.getDOM('movie')
        if ($dom && $dom.length) {
            $dom.find('.tile__body').hide();
        }
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
