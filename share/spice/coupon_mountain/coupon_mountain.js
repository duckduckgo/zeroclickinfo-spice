// spice callback function
function ddg_spice_coupon_mountain (api_result) {

    if (api_result.count < 1) return;

    var relevants = getRelevant(api_result.coupon);
	var hander = api_result.keyword ? api_result.keyword + " (CouponMountain)" : "Coupon Search (CouponMountain)";

    if (!relevants) return;

    Spice.render({
        data: api_result,
        source_name: 'CouponMountain',
        source_url: 'http://www.couponmountain.com',
        header1: hander,
        //force_big_header: true,
        //more_logo: "quixey_logo.png",
        template_frame: "carousel",
        template_normal: "coupon_mountain",
		template_options: {li_width: 150, li_height: 138},
        carousel_css_id: "coupon_mountain",
        carousel_template_detail: "coupon_mountain_detail",
        carousel_items: relevants
    });

	function getRelevant (coupons) {
		for (var i = 0; i < coupons.length; i++) {
			if (coupons[i].expire == "3333-03-03") {
				coupons[i].expire = "";
			}
		}
		return coupons;
	}
}

