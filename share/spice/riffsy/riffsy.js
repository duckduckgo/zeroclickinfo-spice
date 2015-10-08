(function (env) {
    "use strict";
    env.ddg_spice_riffsy = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.results || !api_result.results.length) {
            return Spice.failed('riffsy');
        }
        
        Spice.add({
            id: 'riffsy',
            name: 'GIFs',
            data: api_result.results,
            view: 'Images',
            meta: {
                sourceName: 'Riffsy',
                sourceUrl: api_result.weburl,
            },
            normalize: function(item) {
                if (item.media && item.media.length && item.media[0].tinygif && item.media[0].gif) {
                    var media = item.media[0];
                    return {
                        thumbnail: media.tinygif.url,
                        tileWidth: media.tinygif.dims[0],
                        highResImage: media.gif.url,
                        image: media.gif.url,
                        url: item.url,
                        height: media.gif.dims[1],
                        width: media.gif.dims[0],
                        title: item.title,
                    };
                }
                return {};
            },
            templates: {
                group: 'images'
            }
        });
    };
}(this));
