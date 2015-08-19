#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Speedtest)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'speedtest' => test_spice(
        '/js/spice/speedtest/query',
        call_type => 'include',
        caller => 'DDG::Spice::Speedtest'
    )
);

done_testing;
