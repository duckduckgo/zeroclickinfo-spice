#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Zomato)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'restaurants in delhi' => test_spice(
        '/delhi',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

