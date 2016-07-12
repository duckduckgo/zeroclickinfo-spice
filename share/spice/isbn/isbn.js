(function (env) {
    "use strict";
    env.ddg_spice_isbn = function (api_result) {

        if (!api_result || api_result.error || !api_result.results || !api_result.results.length) {
            return Spice.failed('isbn');
        }

        Spice.add({
            id: 'isbn',
            name: 'Books',
            data: api_result.results,
            meta: {
                itemType: 'Amazon Results',
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true
            },
            templates: {
                group: 'products',
                options: {
                    buy: 'products_amazon_buy',
                    rating: false
                }
            },
            relevancy: {
                dup: ['ASIN','img_m','img']
            }
        });
    };
}(this));
