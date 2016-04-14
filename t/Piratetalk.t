#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Piratetalk)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'pirate speak hello' => test_spice(
        '/js/spice/piratetalk/hello',
        call_type => 'include',
        caller => 'DDG::Spice::Piratetalk'
    ),
    'pirate talk hello how are you' => test_spice(
        '/js/spice/piratetalk/hello%20how%20are%20you',
        call_type => 'include',
        caller => 'DDG::Spice::Piratetalk'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'pirate jon snow' => undef,
    
    'piraaate talk like this' => undef,
);

done_testing;

