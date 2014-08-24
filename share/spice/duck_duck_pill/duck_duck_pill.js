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
            /*
             * Decided not to use a template group because
             * this project needed more flexibility than what
             * the predefined groups provided. basic_image_item
             * works well for items, but flexibility of 
             * base_detail was necessary for details.
             */
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
                    /*
                     * National Drug Code (NDC) is an 11-digit, segmented,
                     * unique product identifier: http://en.wikipedia.org/wiki/National_Drug_Code
                     */
                    title: item.ndc11
                };
            } 
        });
    };
}(this));
