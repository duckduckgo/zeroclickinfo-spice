(function(env) {
    "use strict";

    env.ddg_spice_anime = function(api_result) {
    
        if (!api_result || api_result.length === 0) {
            return Spice.failed("anime");
        }

        Spice.add({
            id: 'anime',
            name: 'Anime',
            data: api_result,
            meta: {
                sourceName: 'Hummingbird',
                sourceUrl: "https://hummingbird.me/",
                sourceIconUrl: DDG.get_asset_path('anime','hummingbird.png')
            },
            normalize: function(item) {
                return {
                    img: item.cover_image,
                    image: item.cover_image, 
                    img_m: item.cover_image,           
                    heading: item.title,
                    abstract: item.synopsis,
                    rating: item.community_rating
                };
            },
            templates: {
                group: 'products_simple',
                detail: Spice.anime.content,
                item_detail: Spice.anime.content,
                options: {
                    brand: true,
                    rating: true,
                },
                variants: {
                    tile: 'poster'
                }
            }
        });
    };
}(this));

