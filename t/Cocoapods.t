#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cocoapods)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'cocoapods test' => test_spice(
        '/js/spice/cocoapods/test',
        call_type => 'include',
        caller => 'DDG::Spice:Cocoapods'
    ),
   
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'cocoapod test afnetworking' => undef,
    'pod afnetworking' => undef,
);

done_testing;

