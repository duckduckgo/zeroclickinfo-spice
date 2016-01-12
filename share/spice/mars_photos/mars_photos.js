(function (env) {
    "use strict";
    env.ddg_spice_mars_photos = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('mars_photos');
        }

        // Render the response
        Spice.add({
            id: "mars_photos",
            name: "Mars Photos",
            data: api_result.photos,
            meta: {
                sourceName: "nasa.com",
                sourceUrl: 'http://nasa.gov/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                   console.log(item);
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
