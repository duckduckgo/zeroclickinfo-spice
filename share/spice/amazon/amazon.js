(function(env) {
    "use strict";

    env.ddg_spice_amazon = function(api_result) {

        if (!api_result || !api_result.results || !api_result.results.length || api_result.results.length == 0) {
            return Spice.failed('products');
        }

        Spice.add({
            id: 'products',
            name: 'Products',
            data: api_result.results,
            allowMultipleCalls: true,
            model: 'Product',
            meta: {
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true,
                next: api_result.next
            },
            templates: {
                group: 'products',
                options: {
                    buy: 'products_amazon_buy'
                }
            },
            onItemShown: function(item) {
                if (item.loadedRatings) { return; }

                var arg = item.rating,
                    url = '/m.js?r=';

                arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                arg = arg.replace('http://www.amazon/reviews/iframe?', '');

                $.getJSON(url + encodeURIComponent(arg), function(r) {
                    if (r.stars.match(/stars-(\d)-(\d)/)) {
                        item.rating = RegExp.$1 + "." + RegExp.$2;
                    }
                    item.reviewCount = r.reviews;

                    // this is kind of dirty, relies on the item.$html being the
                    // memory ref to the tile dom, and re-renders the stars/renders block of html
                    // now that we have updated ratings data:
                    if (item.$html) {
                        var $ratingsWrapper = item.$html.find('.tile__rating,.detail__rating');
                        if ($ratingsWrapper && $ratingsWrapper.length) {
                            $ratingsWrapper.html(Handlebars.helpers.starsAndReviews(item.rating, item.reviewCount, item.url_review, true));
                        }
                    }
                });

                item.loadedRatings = true;
            }
        });
    }
}(this));
