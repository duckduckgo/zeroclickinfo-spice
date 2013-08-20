package DDG::Spice::CouponMountain;

use DDG::Spice;

name "CouponMountain";
description "Get the newest coupon codes for you";
source "coupon";
primary_example_queries "hp coupon";
secondary_example_queries "hp promo codes";
category "finance";
topics "economy_and_finance", "food_and_drink", "everyday", "travel";
icon_url "/i/couponmountain.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CouponMountain.pm";
attribution web => ['http://www.couponmountain.com', 'Coupon Mountain'],
            email => ['dwashburn@valueclickbrands.com', 'Daniel Washburn'];

triggers any => "coupon", "coupons", "promo code", "promo codes", "discount code", "discount codes", "promotional code", "promotional codes";

#spice from => '([^/]+)/?([^/]+)?';
#spice to => 'http://mamsweb101.dev.wl.mezimedia.com:8081/Coupon/searchEngine.html?keyword=$1';
spice to => 'http://www.couponmountain.com/plugin/searchEngine.html?keyword=$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle query => sub {
	return unless (length $_);
	#my $refer = $ENV{HTTP_REFERER};
	return $_;
};

1;
