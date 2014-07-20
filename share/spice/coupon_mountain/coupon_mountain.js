(function(env){
    'use strict';

    env.ddg_spice_coupon_mountain = function(api_result) {
        if (api_result.count < 1) {
            return Spice.failed('coupon_mountain');
        }

        Spice.add({
            id: 'coupon_mountain',
            name: 'Coupons',
            data: api_result.coupon,
            meta: {
                searchTerm: api_result.keyword,
                itemType: 'Coupons',
                sourceName: 'CouponMountain',
                sourceUrl: 'http://www.couponmountain.com/search.php?searchtext='+ api_result.keyword
            },
            normalize: function(item){
                // Get the discount from the description
                var getDiscount = function() {
                    var regex = /.[0-9]+%?/i;
                    var result = regex.exec(item.name);
                    if (result) {
                        return result.join('');
                    }
                    return '';
                }

                // Return discount string without symbols
                var stripSymbol = function(string) {
                    return string.replace(/[^0-9]/i, '');
                }

                // Get symbol in the discount
                var getSymbol = function(string) {
                    var regex = /[^0-9\s]/i;
                    var result = regex.exec(string);
                    if (result) {
                        return result.join('');
                    }
                    return '';
                }
                return {
                    image: item.iconUrl,
                    img: item.iconUrl,
                    title: stripSymbol(getDiscount()),
                    description: item.name,
                    symbol: getSymbol(getDiscount()),
                    heading: stripExpiry(item.desc),
                    price: item.merName,
                    abstract: getExpiry(item.expire),
                    url: item.displayURL || item.merUrl
                }
            },
            templates: {
                group: 'base',
                detail: Spice.coupon_mountain.buy,
                options: {
                    brand: false,
                    rating: false,
                    price: true,
                    content: Spice.coupon_mountain.content,
                    detailVariant: 'light'
                }
            },
            sort_fields: {
                merName: function(a,b) {
                    return (a.merName < b.merName) ? -1 : 1;
                }
            },
            sort_default: 'merName',
            onItemSelected: highlightCode,
            onShow: highlightCode //auto select the coupon code for a single-item result
        });
    };

    function getExpiry (dateString) {
        // 3333-03-03 means coupon has no expiry date
        if (!dateString || dateString === '3333-03-03'){
            return null;
        }
    }

    Spice.registerHelper('CouponMountain_dateString', function(string) {
        var months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
            date = DDG.getDateFromString(dateString);

        return 'Expires: ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    });

    function stripExpiry (string) {
        return string.replace(/ (hurry, )?(offer|good through|expires|ends|valid \w+) .+$/i, '');
    };

    // Highlight coupon code text
    function highlightCode () {

        var couponCode = $('.zci--coupon_mountain input.tag');

        if (couponCode) {
            couponCode.click(function() {
                couponCode.focus().select();
             });
        }
    };

})(this);
