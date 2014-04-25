(function(env){
    'use strict';

    env.ddg_spice_coupon_mountain = function(api_result) {
        if (api_result.count < 1) {
            return; // Spice.failed('coupon_mountain');
        }

        Spice.add({
            id: 'coupon_mountain',
            name: 'Coupon Mountain',
            data: api_result.coupon,
            meta: {
                searchTerm: api_result.keyword,
                itemType: 'Coupons',
                sourceName: 'CouponMountain',
                sourceUrl: 'http://www.couponmountain.com/search.php?searchtext='+ api_result.keyword
            },
            normalize: function(o){
                return {
                    image: o.iconUrl,
                    img: o.iconUrl,
                    title: o.desc,
                    heading: o.desc,
                    ratingText: o.merName,
                    rating: "unrated",
                }
            },
            template_group: 'products_simple',

            templates: {
                options: {
                    buy: Spice.coupon_mountain.buy
                }
            }

            // sort_fields: {
            //     merName: function(a,b) {
            //         return a.merName > b.merName;
            //     }
            // }
        });

        // Manually trigger highlight for single result
        if (api_result.count === 1) {
            highlight_code();
        }

        // highlight coupon code text
        function highlight_code () {
            var coupon_code = $('.zci--coupon_mountain input.tag');
            
            coupon_code.click(function() {
                coupon_code.focus().select();
            });

            coupon_code.click();
        }
    };

    Spice.registerHelper('check_expiry', function(string, options) {
        'use strict';

        // 3333-03-03 mean coupon has no expiry date
        if (string && string != '3333-03-03'){
            return options.fn(this);
        } else {
           return;
        }
    });

    Spice.registerHelper('dateString', function(string) {
        'use strict';

        var date = DDG.getDateFromString(string),
            months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];

        return 'Expires ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    });

    Spice.registerHelper('stripExpiry', function(string) {
        'use strict';

        return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, '');
    });

})(this);
