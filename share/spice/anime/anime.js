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
                var cover_image = '';
                if (item.cover_image) {
                    cover_image = DDG.toHTTP(item.cover_image);
                }

                return {
                    img: cover_image,
                    image: cover_image,
                    img_m: cover_image,
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
                    rating: true,
                    buy: Spice.anime.buy
                }
            }
        });
    };
}(this));

