#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Uzzinivin)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'get rn kk9409' => test_spice(
        '/js/spice/uzzinivin/kk9409',
        call_type => 'include',
        caller => 'DDG::Spice::Uzzinivin'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'get rn' => undef,
    'get rn toolong' => undef,
);

done_testing;

