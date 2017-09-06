#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Earthquakes)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'recent earthquakes' => test_spice(
        '/js/spice/earthquakes/recent%20earthquakes',
        call_type => 'include',
        caller => 'DDG::Spice::Earthquakes'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'earth quakes' => undef,
);

done_testing;

