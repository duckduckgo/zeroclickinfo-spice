#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::AgeOfCelebrity)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'how old is bill clinton' => test_spice(
        '/js/spice/age_of_celebrity/Bill%20Clinton',
        call_type => 'include',
        caller => 'DDG::Spice::AgeOfCelebrity'
    ),
    'how old is jimi hendrix' => test_spice(
        '/js/spice/age_of_celebrity/Jimi%20Hendrix',
        call_type => 'include',
        caller => 'DDG::Spice::AgeOfCelebrity'
    ),
    'age of vanna white' => test_spice(
        '/js/spice/age_of_celebrity/Vanna%20White',
        call_type => 'include',
        caller => 'DDG::Spice::AgeOfCelebrity'
    ),
    
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'how old is' => undef
);

done_testing;

