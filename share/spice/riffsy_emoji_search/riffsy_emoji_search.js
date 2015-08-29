(function (env) {
    "use strict";
    env.ddg_spice_riffsy_emoji_search = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.results) {
            return Spice.failed('riffsy_emoji_search');
        }
        
        Spice.add({
            id: 'riffsy_emoji_search',
            name: 'Riffsy Emoji Search',
            data: api_result.results,
            view: 'Images',
            meta: {
                sourceName: 'Riffsy',
                sourceUrl: 'http://www.riffsy.com/search/' + encodeURIComponent(DDG.get_query()),
            },
            normalize: function(item) {
                return {
                    thumbnail: item.media[0].tinygif.url,
                    tileWidth: item.media[0].tinygif.dims[0],
                    highResImage: item.media[0].gif.url,
                    image: item.media[0].tinygif.url,
                    url: item.url,
                    height: item.media[0].tinygif.dims[1],
                    width: item.media[0].tinygif.dims[0],
                    title: item.title,
                };
            },
            templates: {
                group: 'images'
            }
        });
    };
}(this));
