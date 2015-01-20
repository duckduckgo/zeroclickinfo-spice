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

my @triggers = ("coupon", "promo code", "discount coupon", "discount code", "promotional code", "deal", "discount");
push (@triggers, map {$_."s"} @triggers);
push (@triggers, map {"$_ for"} @triggers);
push (@triggers, "coupon mountain");

triggers any => @triggers;

spice to => 'http://www.couponmountain.com/plugin/searchEngine.html?keyword=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
