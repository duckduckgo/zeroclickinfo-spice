(function(env){
    'use strict';

    env.ddg_spice_coupon_mountain = function(api_result) {
        if (api_result.count < 1) {
            return Spice.failed('coupon_mountain');
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
            normalize: function(item){
                return {
                    image: item.iconUrl,
                    img: item.iconUrl,
                    title: item.name,
                    heading: stripExpiry(item.desc),
                    price: item.merName,
                    abstract: getExpiry(item.expire)
                }
            },
            templates: {
                group: 'products',
                options: {
                    buy: Spice.coupon_mountain.buy,
                    brand: false,
                    rating: false
                }
            },
            sort_fields: {
                merName: function(a,b) {
                    return (a.merName < b.merName) ? -1 : 1;
                }
            },
            sort_default: 'merName'
        });
    };

    function getExpiry (dateString) {

        // 3333-03-03 means coupon has no expiry date
        if (!dateString || dateString === '3333-03-03'){
            return null;
        }

        var months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
            date = DDG.getDateFromString(dateString);

        return 'Expires: ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };

    function stripExpiry (string) {
        return string.replace(/ (hurry, )?(offer|good through|expires|ends|valid \w+) .+$/i, '');
    };

})(this);
