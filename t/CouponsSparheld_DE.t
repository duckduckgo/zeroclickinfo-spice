#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::CouponsSparheld_DE)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'gutschein zalando' => test_spice(
        '/js/spice/coupons_sparheld_de/query',
        call_type => 'include',
        caller => 'DDG::Spice::CouponsSparheld_DE'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'gut schein zalando' => undef,
);

done_testing;

