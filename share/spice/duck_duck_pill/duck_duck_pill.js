(function (env) {
    "use strict";
    env.ddg_spice_duck_duck_pill = function(api_result){

        if (api_result.error || api_result.replyStatus.totalImageCount < 1) {
            return Spice.failed('duck_duck_pill');
        }

        Spice.add({
            id: "duck_duck_pill",
            name: "DuckDuckPill",
            data: api_result.nlmRxImages,
            meta: {
                sourceName: "C3PI RxImageAccess RESTful API",
                sourceUrl: "http://rximage.nlm.nih.gov/"
            },
            templates: {
                item: 'basic_image_item',
                detail: 'base_detail',
                options:{
                    content: Spice.duck_duck_pill.duck_duck_pill_details,
                    moreAt: true,
                    price: false,
                    brand: false,
                    priceAndBrand: false,
                    rating: false,
                    ratingText: false
                }
            },
            normalize: function(item) {
                return {
                    image: item.imageUrl,
                    title: item.ndc11
                };
            } 
        });
    };
}(this));
