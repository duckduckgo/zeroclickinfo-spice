(function(env) {
    "use strict";
    
    // A change in the Rotten Tomatoes API returns images that end in _tmb.
    // This changes this to _det.
    function toDetail(img) {
        return img.replace(/tmb\.(jpg|png)/, "det.$1");
    }
    
    function get_image(critics_rating) {
        // The filename is the same as the critics_rating, but
        // lowercased and with spaces converted to dashes.
        critics_rating = critics_rating.toLowerCase().replace(/ /, '-');
        if(is_retina) {
            return DDG.get_asset_path('in_theaters', critics_rating + '.retina.png');
        } else {
            return DDG.get_asset_path('in_theaters', critics_rating + '.png');
        }
    }
    
    env.ddg_spice_in_theaters = function(api_result) {
        if(!api_result || api_result.error) {
            return Spice.failed('in_theaters');
        }
    
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
                
                // Modify the image from _tmb.jpg to _det.jpg
                var image = toDetail(item.posters.detailed)
                return {
                    rating: item.ratings.critics_score >= 0 ? item.ratings.critics_score / 20 : 0,
                    image: image,
                    icon_image: get_image(item.ratings.critics_rating),
                    abstract: Handlebars.helpers.ellipsis(item.synopsis, 200),
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
                    subtitle_content: Spice.in_theaters.subtitle_content,
                    rating: false,
                    buy: Spice.in_theaters.buy
                }
            }
        });

        // Hide the bottom text so that the poster occupies the whole tile.
        Spice.getDOM('in_theaters').find('.tile__body').addClass('is-hidden');
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