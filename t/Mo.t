#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Mo)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'learn more about engineering' => test_spice(
        '/js/spice/mo/engineering',
        call_type => 'include',
        caller => 'DDG::Spice::Mo'
    ),
    'learn more about artificial intelligence' => test_spice(
        '/js/spice/mo/artificial+intelligence',
        caller => 'DDG::Spice::Mo'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'learn more about ddo1' => undef,
);

done_testing;

