Spice.amazon = {

    id: 'products', // not sure why this id is products and the spice is amazon?
    name: 'Products',
    allowMultipleCalls: true,
    model: 'Product',
    templates: {
        group: 'products',
        options: {
            buy: 'products_amazon_buy'
        }
    },

    isValidResponse: function(res) {
        return res && res.results && res.results.length;
    },

    onResponse: function(res) {
        return {
            data: res.results,
            meta: {
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: res.more_at,
                sourceIcon: true,
                next: res.next
            }
        };
    },

    onItemShown: function(item) {
        if (item.loadedRatings) { return; }

        var arg = item.rating,
            url = '/m.js?r=';

        arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
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
}
