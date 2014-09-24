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
        if(typeof Spice.getDOM('in_theaters') !== 'undefined') {
            Spice.getDOM('in_theaters').find('.tile__body').addClass('is-hidden');
        }
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
