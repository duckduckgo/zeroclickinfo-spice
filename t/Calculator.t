#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Calculator)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    '5 + 5=' => test_spice(
        '/js/spice/calculator/query',
        call_type => 'include',
        caller => 'DDG::Spice:Calculator'
    ),
    'calculate 5 + 5' => test_spice(
        '/js/spice/calculator/query',
        call_type => 'include',
        caller => 'DDG::Spice:Calculator'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    '5 + 5 = 0' => undef,
);

done_testing;

