(function (env) {
    "use strict";


    env.ddg_spice_coupons = function (api_result) {
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('coupons');
        }

        // Render the response
        DDG.require('moment.js', function () {
            Spice.add({
                id: "coupons",
                data: api_result.items,
                meta: {
                    sourceName: api_result.result.sitename,
                    sourceUrl: api_result.result.homeurl
                },
                normalize: function (item) {
                    return {
                        title: item.title,
                        description: item.parent.title,
                        url: item.url.coupon,
                        image: item.url.logo
                    };
                },
                templates: {
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true
                    },
                    elClass: {
                        tileBody: "text-center"
                    },
                    variants: {
                        tileTitle: "3line-large"
                    }
                }
            });
        });
    };
}(this));
