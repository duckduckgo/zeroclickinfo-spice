(function(env){
    "use strict";
    env.ddg_spice_images = function(apiResult) {

        if (!apiResult || !apiResult.results || !apiResult.results.length) {
            return Spice.failed('images');
        }

        Spice.add({
            id: 'images',
            name: 'Images',
            allowMultipleCalls: true,
            data: apiResult.results,
            ads: apiResult.ads,
            meta: {
                next: apiResult.next
            },
            templates: {
                group: 'images'
            },
            relevancy: {
                dup: 'image'
            }
        });

    }
}(this));
