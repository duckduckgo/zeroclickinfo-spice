(function (env) {
    "use strict";
    env.ddg_spice_mars_photos = function(api_result){
        if (!api_result || api_result.error || !api_result.photos || api_result.photos.length < 1) {
            return Spice.failed('mars_photos');
        }

        Spice.add({
            id: "mars_photos",
            name: "Mars Photos",
            data: api_result.photos,
            meta: {
                sourceName: "NASA",
            },
            normalize: function(item) {
                return {
                    image: item.img_src,
                    url: item.img_src
                };
            },
            templates: {
                group: 'media',
                detail: false,
                item_detail: false,
                options: {
                   footer: Spice.mars_photos.footer,
                   moreAt: true
               }
            }
        });
    };
}(this));
