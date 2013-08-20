function ddg_spice_coupon_mountain (api_result) {

    if (api_result.count < 1) return;

    var coupons = fixExpiry(api_result.coupon),
        header = api_result.keyword
            ? api_result.keyword + " (CouponMountain)"
            : "Coupon Search (CouponMountain)",
        keyword = encodeURIComponent(api_result.keyword);

    // highlight coupon code on detail area opening
    function highlight_code () {
        var coupon_code = $("#coupon_code");
        coupon_code.click(function() {
            coupon_code.focus().select();
        }).click();
    }

    Spice.render({
        data                     : api_result,
        source_name              : 'CouponMountain',
        source_url               : 'http://www.couponmountain.com/search.php?searchtext='
                                    + keyword,
        header1                  : header,
        template_frame           : "carousel",
        template_normal          : "coupon_mountain",
        template_options         : { li_width: 150  },
        carousel_css_id          : "coupon_mountain",
        carousel_template_detail : "coupon_mountain_detail",
        carousel_items           : coupons,
        item_callback            : highlight_code
    });

    // Check relevancy of coupon results
    function fixExpiry (coupons) {
        for (var i = 0; i < coupons.length; i++) {
            if (coupons[i].expire == "3333-03-03") {
                coupons[i].expire = "";
            }
        }
        return coupons;
    }
}

Handlebars.registerHelper("dateString", function(string) {
    var date = DDG.getDateFromString(string),
        months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
});

Handlebars.registerHelper("stripExpiry", function(string) {
    return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, "");
});