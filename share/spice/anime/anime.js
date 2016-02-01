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
                sourceIconUrl: DDG.get_asset_path('anime','hummingbird.png')
            },
            relevancy: {
                skip_words: ['anime', 'hummingbird'],
                primary: [
                    { required: 'cover_image' },
                    { key: 'synopsis' },
                    { key: 'alternate_title' },
                    { key: 'title' },
                ]
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
                    abstract: item.synopsis,
                    rating: item.community_rating,
                    url: item.url
                };
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.anime.subtitle_content,
                    rating: true,
                    buy: Spice.anime.buy,
                    hideReviewText: true
                }
            }
        });
    };
}(this));

