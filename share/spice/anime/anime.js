(function(env) {
    "use strict";

    env.ddg_spice_anime = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed("anime");
        }

        var script = $('[src*="/js/spice/anime/"]')[0],
        source = $(script).attr("src"),
        query = source.match(/anime\/([^\/]+)/)[1],
        decodedQuery = decodeURIComponent(query);

        console.log(api_result);

        Spice.add({
            id: 'anime',
            name: 'Anime',
            data: api_result,
            meta: {
                sourceName: 'Hummingbird',
                sourceUrl: "https://hummingbird.me/search?query=" + query,
                sourceIconUrl: DDG.get_asset_path('anime','hummingbird.png'),
                itemType: 'Anime'
            },
            normalize: function(item) {
                return {
                    img: item.cover_image,
                    image: item.cover_image,
                    img_m: item.cover_image,
                    heading: item.title,
                    title: item.title,
                    abstract: item.synopsis.split(' ').slice(0,49).join(' ') + '...',
                    rating: item.community_rating,
                    url: item.url,
                    is_retina: (DDG.is3x || DDG.is2x) ? "is_retina" : "no_retina"
                };
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.anime.subtitle_content,
                    rating: false,
                    buy: Spice.anime.buy
                },
                variants: {
                    productSub: 'noMax'
                },
                elClass: {
                    tileMediaImg: 'js-movie-img',
                    productMediaImg: 'js-movie-img'
                }
            }
        });
    };
}(this));

