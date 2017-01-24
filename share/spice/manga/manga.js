(function(env) {
    "use strict";

    env.ddg_spice_manga = function(api_result) {

        if (!api_result || api_result.length === 0) {
            return Spice.failed("manga");
        }

        var script = $('[src*="/js/spice/manga/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/manga\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        Spice.add({
            id: 'manga',
            name: 'Manga',
            data: api_result.data,
            meta: {
                sourceName: 'Kitsu',
                sourceUrl: "https://kitsu.io/manga?text=" + query,
                sourceIconUrl: DDG.get_asset_path('manga','kitsu.png')
            },
            relevancy: {
                skip_words: ['manga', 'kitsu'],
                primary: [
                    { required: 'attributes.posterImage.small' },
                    { key: 'attributes.synopsis' },
                    { key: 'attributes.canonicalTitle' }
                ]
            },
            normalize: function(item) {
                var poster_image = '';
                if (item.attributes.posterImage.small) {
                    poster_image = DDG.toHTTP(item.attributes.posterImage.small);
                }
                var url = "https://kitsu.io/manga/" + item.attributes.slug

                return {
                    img: poster_image,
                    image: poster_image,
                    img_m: poster_image,
                    heading: item.attributes.canonicalTitle,
                    title: item.attributes.canonicalTitle,
                    abstract: item.attributes.synopsis,
                    rating: item.attributes.averageRating,
                    url: url
                };
            },
            templates: {
                group: 'movies',
                options: {
                    subtitle_content: Spice.manga.subtitle_content,
                    rating: true,
                    buy: Spice.manga.buy,
                    hideReviewText: true
                }
            }
        });
    };
}(this));

