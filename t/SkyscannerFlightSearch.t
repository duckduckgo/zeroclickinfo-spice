#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SkyscannerFlightSearch)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'skyscanner' => test_spice(
        '/js/spice/skyscanner_flight_search/query',
        call_type => 'include',
        caller => 'DDG::Spice::SkyscannerFlightSearch'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'sky scanner' => undef,
);

done_testing;

