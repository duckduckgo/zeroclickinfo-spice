function ddg_spice_coupon_mountain (api_result) {

    if (api_result.count < 1) return;

    var header = api_result.keyword
            ? api_result.keyword + " (CouponMountain)"
            : "Coupon Search (CouponMountain)",
        keyword = encodeURIComponent(api_result.keyword);

    Spice.render({
        data                     : api_result,
        spice_name               : "coupon_mountain",
        source_name              : 'CouponMountain',
        source_url               : 'http://www.couponmountain.com/search.php?searchtext='+ keyword,
        header1                  : header,
        template_frame           : "carousel",
        more_icon_offset         : "-3px",
        template_options         : { 
            items                : api_result.coupon,
            template_item        : "coupon_mountain",
            template_detail      : "coupon_mountain_detail",
            li_width             : 150  
        },
        item_callback            : highlight_code
    });

    // highlight coupon code on detail area opening
    function highlight_code () {
        var coupon_code = $("#coupon_code");
        coupon_code.click(function() {
            coupon_code.focus().select();
        }).click();
    }
}

Handlebars.registerHelper("check_expirey", function(string) {
    if (string != "3333-03-03"){
        fn.options(string);
    }
});

Handlebars.registerHelper("dateString", function(string) {
    var date = DDG.getDateFromString(expiry),
        months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
    return "Expires " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    
});

Handlebars.registerHelper("stripExpiry", function(string) {
    return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, "");
});
