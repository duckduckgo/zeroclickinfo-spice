(function (env) {
    "use strict";
    env.ddg_spice_isbn = function (api_result) {

        if (!api_result || api_result.error || !api_result.results || !api_result.results.length || api_result.results.length == 0) {
            return Spice.failed('isbn');
        }

        Spice.add({
            id: 'isbn',
            name: 'Book',
            data: api_result.results[0],
            signal: 'high',

            meta: {
                itemType: 'Book',
                sourceName: 'Amazon',
                sourceUrl: api_result.results[0].url
            },
            
            templates: {
                group: 'products',
                options: {
                    abstract: true,
                    rating: false,
                    reviewCount: false,
                    buy: Spice.isbn.buy
                }
            }
        });
    };
}(this));
