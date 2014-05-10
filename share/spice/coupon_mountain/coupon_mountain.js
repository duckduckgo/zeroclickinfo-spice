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
                    heading: item.desc,
                    ratingText: item.merName,
                    abstract: getExpiry(item.expire)
                }
            },
            template_group: 'products_simple',
            templates: {
                options: {
                    buy: Spice.coupon_mountain.buy,
                    variant: 'narrow'
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

    // function stripExpiry (string) {
    //     return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, '');
    // };

})(this);
