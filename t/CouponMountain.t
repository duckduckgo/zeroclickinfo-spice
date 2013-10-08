#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %q = (
  "coupons for nordstrom" => "nordstrom",
  "dell discount codes"   => "dell",
  "coupons subway"        => "subway",
);

ddg_spice_test(
  [qw( DDG::Spice::CouponMountain)],
  map {
    $_ => test_spice('/js/spice/coupon_mountain/'.$q{$_}, caller => 'DDG::Spice::CouponMountain')
  } keys %q,
);

done_testing;
