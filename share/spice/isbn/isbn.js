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
            allowMultipleCalls: true,
            meta: {
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true,
                next: api_result.next,
                rerender: [
                    'reviewCount'
                ]
            },
            templates: {
                group: 'products',
                options: {
                    buy: 'products_amazon_buy'
                }
            },
            relevancy: {
                dup: ['ASIN','img_m','img']
            },
            onItemShown: function(item) {
                var model = item.model,
                    arg = model.rating,
                    url = '/m.js?r=';

                if (model.requestedRatings) { return; }

                arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                arg = arg.replace('http://www.amazon/reviews/iframe?', '');

                $.getJSON(url + encodeURIComponent(arg), function(r) {
                    if (r.stars.match(/stars-(\d)-(\d)/)) {
                        model.set({ rating: RegExp.$1 + "." + RegExp.$2 });
                    }
                    model.set({ reviewCount:  r.reviews });
                });

                model.set({ requestedRatings: true });
            }
        });
    };
}(this));
