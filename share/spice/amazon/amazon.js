(function(env) {
    "use strict";

    env.ddg_spice_amazon = function(api_result) {

        if (!api_result || !api_result.results || !api_result.results.length || api_result.results.length == 0) {
            return Spice.failed('products');
        }

        var items = api_result.results,
            loadedRatingsData = false;

        Spice.add({
            id: 'products',
            name: 'Products',
            data: items,
            meta: {
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true
            },
            templates: {
                group: 'products',
                options: {
                    buy: 'products_amazon_buy'
                }
            },

            // wait until after tab is shown to make
            // the individual ajax requests to get ratings data. Allows
            // products to get to show() asap so we have fewer fallbacks,
            // and saves on useless http requests for hidden products tabs.
            onShow: function() {
                // only do this on the first time the tab is shown:
                if (loadedRatingsData) {
                    return;
                }

                var onGotRatingsData = function(r, s, x) {
                    if (r.stars.match(/stars-(\d)-(\d)/)) {
                        this.rating = RegExp.$1 + "." + RegExp.$2;
                    }
                    this.reviewCount = r.reviews;

                    // this is kind of dirty, relies on the item.$html being the
                    // memory ref to the tile dom, and re-renders the stars/renders block of html
                    // now that we have updated ratings data:
                    if (this.$html) {
                        var $ratingsWrapper = this.$html.find('.tile__rating');
                        if ($ratingsWrapper && $ratingsWrapper.length) {
                            $ratingsWrapper.html(Handlebars.helpers.starsAndReviews(this.rating, this.reviewCount, this.url_review, true));
                        }
                    }
                }

                for (var i = 0; i < items.length; i++) {
                    var item = items[i],
                        arg = item.rating,
                        url = '/m.js?r=';

                    arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
                    arg = arg.replace('http://www.amazon/reviews/iframe?', '');
                    $.getJSON(url + encodeURIComponent(arg), onGotRatingsData.bind(item));
                }

                // set flag so we only load it once:
                loadedRatingsData = true;
            }
        });
    }
}(this));