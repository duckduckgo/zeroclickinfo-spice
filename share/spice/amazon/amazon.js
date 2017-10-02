(function(env) {
    "use strict";
    env.ddg_spice_amazon = function(api_result) {

        var dropDown = true;

        if (DDG && DDG.page && DDG.page.ads) {
            if (DDG.page.ads.adxExperiment === 'prod_ndd') {
                dropDown = false;
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
            templates: {
                item: 'products_item',
                // group: 'products',
                options: {
                    buy: 'products_amazon_buy',
                    badge: 'products_amazon_badge',
                    rating: false
                }
            },
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
