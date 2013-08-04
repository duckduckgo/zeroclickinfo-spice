function ddg_spice_coupon_mountain (api_result) {

    if (api_result.count < 1) return;

    var relevants = getRelevant(api_result.coupon);
    var hander = api_result.keyword ? api_result.keyword + " (CouponMountain)" : "Coupon Search (CouponMountain)";

    if (!relevants) return;

    Spice.render({
        data                     : api_result,
        source_name              : 'CouponMountain',
        source_url               : 'http://www.couponmountain.com',
        header1                  : hander,
        template_frame           : "carousel",
        template_normal          : "coupon_mountain",
        template_options         : {
            li_width: 150
        },
        carousel_css_id          : "coupon_mountain",
        carousel_template_detail : "coupon_mountain_detail",
        carousel_items           : relevants
    });

    // Check relevancy of coupon results
    function getRelevant (coupons) {
        var relevants = [],
            skip_words = ['coupon', 'coupon mountain'];

        for (var i = 0; i < coupons.length; i++) {
            var coupon = coupons[i];

            if (coupon.expire == "3333-03-03") {
                coupon.expire = "";
            }

            if (DDG.isRelevant(coupon.merName.toLowerCase(), skip_words) ||
                DDG.isRelevant(coupon.desc.toLowerCase(), skip_words)){
                relevants.push(coupon);
                console.log("RELEVANT! ", coupon);
            }
        }
        return relevants;
    }
}

Handlebars.registerHelper("dateString", function(string) {
    var cleanString = string.replace(/-0/g, "-");
    var date = new Date(cleanString),
        months = [ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
});

Handlebars.registerHelper("stripExpiry", function(string) {
    return string.replace(/(offer|good through|expires|ends|valid \w+) .+$/i, "");
});