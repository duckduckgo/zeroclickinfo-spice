#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::CRAN)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'r ggplot2' => test_spice(
        '/js/spice/cran/query',
        call_type => 'include',
        caller => 'DDG::Spice::CRAN'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'r plot graph how' => undef,
);

done_testing;

