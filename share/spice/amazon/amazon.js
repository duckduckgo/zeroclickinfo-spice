(function(env) {
    "use strict";
    env.ddg_spice_amazon = function(api_result) {

        var templates = {
            group: 'products',
            options: {
                buy: 'products_amazon_buy',
                badge: 'products_amazon_badge',
                rating: false
            }
        };

        if (DDG && DDG.page && DDG.page.ads) {
            if (DDG.page.ads.adxExperiment === 'prod_ndd') {
                templates = {
                    item: 'products_item',
                    options: {
                        buy: 'products_amazon_buy',
                        badge: 'products_amazon_badge',
                        rating: false
                    }
                };
            }
        }


        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('products');
        }

        Spice.add({
            id: 'products',
            name: 'Products',
            data: api_result.results,
            allowMultipleCalls: true,
            meta: {
                itemType: 'Amazon ' + l('Results'),
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true,
                next: api_result.next
            },
            templates: templates,
            relevancy: {
                dup: ['ASIN','img_m','img']
            },
            normalize: function(item) {
                item.showBadge = item.is_prime;

                return item;
            }
        });
    }
}(this));
