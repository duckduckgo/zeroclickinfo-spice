(function (env) {
    "use strict";

    var getPrice = function(currencyCode, price) {
        if (currencyCode == "USD") {
            return "$" + price;
        } else {
            return price + " " + currencyCode;
        }
    }

    env.ddg_spice_etsy = function(api_result) {

        if (!api_result || api_result.results.length == 0) {
            return Spice.failed('etsy');
        }

        var endpoint = (
            'https://www.etsy.com/search?q=' +
            api_result.params.keywords.replace(" ", "+")
        );

        Spice.add({
            id: "etsy",

            // Customize these properties
            name: "Products",
            data: api_result.results,
            meta: {
                sourceName: "Etsy",
                total: api_result.results.length,
                sourceUrl: endpoint,
                searchTerm: api_result.params.keywords,
            },
            normalize: function(item) {
                var feedback_info = item.User.feedback_info;
                var image = item.Images[0];
                var shop = item.Shop;
                var reviewUrl = "https://www.etsy.com/shop/" + shop.shop_name + "/reviews";
                return {
                    url: item.url,
                    img: image.url_170x135,
                    img_m: image.url_570xN,
                    heading: item.title,
                    brand: shop.title,
                    price: getPrice(item.currency_code, item.price),
                    // Feedback on etsy is stored on a 100 point scale.
                    rating: feedback_info.score / 20.0,
                    reviewCount: feedback_info.count,
                    url_review: reviewUrl,
                };
            },
            templates: {
                group: 'products',
            }
        });
    };
}(this));
