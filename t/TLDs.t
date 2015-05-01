#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::TLDs)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    '.us tld' => test_spice(
        '/js/spice/tlds/query',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    '.iamanidiotweirdtld tld' => undef,
);

done_testing;

