(function(env) {
    "use strict";
    env.ddg_spice_amazon = function(api_result) {

        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('products');
        }

        var loaded = {};

        Spice.add({
            id: 'products',
            name: 'Products',
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
                var arg = item.rating,
                    url = '/m.js?r=';

                if (loaded[item.id]) { return; }

                arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                arg = arg.replace('http://www.amazon/reviews/iframe?', '');

                $.getJSON(url + encodeURIComponent(arg), function(r) {
                    if (r.stars.match(/stars-(\d)-(\d)/)) {
                        item.set({ rating:  RegExp.$1 + "." + RegExp.$2 });
                    }
                    item.set({ reviewCount:  r.reviews });
                });

                loaded[item.id] = 1;
            }
        });
    }
}(this));
