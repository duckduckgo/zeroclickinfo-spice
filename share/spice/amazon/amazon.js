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
            switch (DDG.page.ads && DDG.page.ads.adxExperiment) {
                case 'prod_brand_v1':
                    itemTemplate = Spice.amazon.branded_products_item;
                    break;
                default:
                    break;
            }
            templates = {
                item: itemTemplate,
                options: {
                    buy: 'products_amazon_buy',
                    badge: 'products_amazon_badge',
                    rating: false
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
