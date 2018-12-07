#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Rfc)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'rfc coffee' => test_spice(
        '/js/spice/rfc/coffee',
        call_type => 'include',
        caller => 'DDG::Spice::Rfc'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'rfc kljfasdf2ldfsaj' => test_spice(
        '/js/spice/rfc/kljfasdf2ldfsaj',
        call_type => 'include',
        caller => 'DDG::Spice::Rfc'
    ),
);

done_testing;

