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
                sourceIcon: true,
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
                var arg = item.rating,
                    url = '/m.js?r=';

                if (item.loadedReviews) { return; }

                arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                arg = arg.replace('http://www.amazon/reviews/iframe?', '');

                $.getJSON(url + encodeURIComponent(arg), function(r) {
                    if (r.stars.match(/stars-(\d)-(\d)/)) {
                        item.set({ rating: RegExp.$1 + "." + RegExp.$2 });
                    }
                    item.set({ reviewCount:  r.reviews });
                });

                item.loadedReviews = 1;
            }
        });
    };
}(this));
