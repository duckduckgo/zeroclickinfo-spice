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
            var itemTemplate = 'products_item';
            switch (DDG.page.ads && DDG.page.ads.adxExperiment) {
                case 'prod_brand_v1':
                    itemTemplate = Spice.amazon.branded_products_item;
                    break;
                case 'prod_shop_v1':
                    itemTemplate = Spice.amazon.button_products_item;
                    break;
                default:
                    break;
            }
            templates = {
                item: itemTemplate,
                options: {
                    buy: 'products_amazon_buy',
                    badge: 'products_amazon_badge',
                    rating: DDG.page.ads && DDG.page.ads.adxExperiment === 'prod_rr_v1'
                }
            };
        }

        Spice.add({
            id: 'products',
            name: 'Products',
            data: api_result.results,
            answerType: 'Products',
            allowMultipleCalls: true,
            meta: {
                itemType: 'Amazon ' + l('Results'),
                sourceName: 'Amazon',
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
