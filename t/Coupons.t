#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Coupons)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    #TEST primary_example_queries
      DDG::Request->new(
        query_raw => "gutschein zalando",
        location => test_location("de")
    )=> test_spice(
        '/js/spice/coupons/DE/zalando',
        call_type => 'include',
        caller => 'DDG::Spice::Coupons'
    ),
    #TEST secondary_example_queries
      DDG::Request->new(
        query_raw => "gutschein h&m",
        location => test_location("de")
    )=> test_spice(
        '/js/spice/coupons/DE/h%26m',
        call_type => 'include',
        caller => 'DDG::Spice::Coupons'
    ),

    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.

    #TEST US (should not hit)
      DDG::Request->new(
        query_raw => "gutschein zalando",
        location => test_location("us")
    )=> undef,

    #TEST wrong trigger words (should not hit)
    'gut schein zalando' => undef,

);

done_testing;

