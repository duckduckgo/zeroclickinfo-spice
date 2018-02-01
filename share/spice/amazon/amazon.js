(function(env) {
    "use strict";
    env.ddg_spice_amazon = function(api_result) {

        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('products');
        }

        var templates = {
            group: 'products',
            options: {
                buy: 'products_amazon_buy',
                badge: 'products_amazon_badge',
                rating: false
            }
        };

        if (api_result.results.length > 1) {
            // var itemTemplate = 'products_item';
            var itemTemplate = Spice.amazon.branded_products_item;
            templates = {
                item: itemTemplate,
                options: {
                    buy: 'products_amazon_buy',
                    badge: 'products_amazon_badge',
                    rating: DDG.page.ads && DDG.page.ads.adxExperiment === 'prod_rr_v1'
                }
            };
        }

        var source = api_result.source;

        Spice.add({
            id: 'products',
            name: 'Products',
            data: api_result.results,
            answerType: 'Products',
            allowMultipleCalls: true,
            meta: {
                itemType: source + ' ' + l('Results'),
                sourceNoTransform: true,
                sourceName: source,
                sourceUrl: api_result.more_at,
                sourceIcon: true,
                rerender: [
                    'reviewCount'
                ],
                next: api_result.next
            },
            templates: templates,
            relevancy: {
                dup: ['ASIN','img_m','img']
            },
            normalize: function(item) {
                item.showBadge = item.is_prime;

                return item;
            },
            onItemShown: function(item) {

                if (DDG.page.ads && DDG.page.ads.adxExperiment === 'prod_rr_v1') {
                    var arg = item.rating,
                        url = '/m.js?t=rating&r=';

                    if (item.loadedReviews) { return; }

                    // arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                    // arg = arg.replace('http://www.amazon/reviews/iframe?', '');

                    $.getJSON(url + encodeURIComponent(arg), function(r) {
                        if (!r) { return; }

                        if (r.stars) {
                            item.set({ rating:  r.stars });
                        }

                        if (r.reviews) {
                            item.set({ reviewCount:  r.reviews });
                        }
                    });

                    item.loadedReviews = 1;
                }
            }
        });
    }
}(this));
