(function(env){
    "use strict";

    env.ddg_spice_gifs = function (api_result) {

        if (!api_result || !api_result.data || !api_result.data.length){
            return Spice.failed("gifs");
        }

        var searchTerm = DDG.get_query().replace(/gifs?|giphy/ig,'').trim();

        Spice.add({
            id: 'gifs',
            name: 'Gifs',
            data: api_result.data,
            view: 'Images',
            meta: {
                sourceName: 'Giphy',
                sourceUrl: 'http://giphy.com/search/' + encodeURIComponent(searchTerm),
                searchTerm: searchTerm,
                itemType: 'Giphy ' + l('Results')
            },
            normalize: function(item) {
                if (item.rating !== "g") {
                    return null;
                }
                return {
                    thumbnail: item.images.fixed_height_still.url,
                    image: item.images.fixed_height.url,
                    url: item.url,
                    height: item.images.fixed_height.height,
                    width: item.images.fixed_height.width,
                    title: item.caption || null,
                    image_mobile: item.images.fixed_height.url
                };
            },
            templates: {
                group: 'images'
            }
        });
    };
})(this);
