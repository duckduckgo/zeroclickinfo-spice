#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Couprex)],

    'electronics coupons' => test_spice(
        '/js/spice/couprex/electronics',
        call_type => 'include',
        caller => 'DDG::Spice::Couprex'
    ),

    'coupon codes for walgreens' => test_spice(
        '/js/spice/couprex/walgreens',
        call_type => 'include',
        caller => 'DDG::Spice::Couprex'
    ),

    'coupons' => undef,
    'free deals' => undef,
    'retailmenot coupons' => undef,
    'amazon discount' => undef
);

done_testing;
