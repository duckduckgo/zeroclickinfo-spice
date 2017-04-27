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
            data: api_result.data,
            meta: {
                sourceName: 'Kitsu',
                sourceUrl: "https://kitsu.io/anime?text=" + query,
                sourceIconUrl: DDG.get_asset_path('anime','kitsu.png')
            },
            relevancy: {
                skip_words: ['anime', 'kitsu'],
                primary: [
                    { required: 'attributes.posterImage.small' },
                    { key: 'attributes.synopsis' },
                    { key: 'attributes.canonicalTitle' }
                ]
            },
            normalize: function(item) {
                var poster_image = '';
                var rating = '';
                var url = "https://kitsu.io/anime/" + item.attributes.slug

                if (item.attributes.posterImage.small) {
                    poster_image = DDG.toHTTP(item.attributes.posterImage.small);
                }

                if (item.attributes.averageRating) {
                    rating = parseFloat((item.attributes.averageRating / 20).toFixed(1));
                }

                return {
                    img: poster_image,
                    image: poster_image,
                    img_m: poster_image,
                    heading: item.attributes.canonicalTitle,
                    title: item.attributes.canonicalTitle,
                    abstract: item.attributes.synopsis,
                    rating: rating,
                    url: url
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

