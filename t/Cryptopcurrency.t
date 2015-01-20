#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [ qw( DDG::Spice::Cryptocurrency ) ],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    '500 ftc' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ftc/ftc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

