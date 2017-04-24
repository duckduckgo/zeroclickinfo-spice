#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::HamCallsigns)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    # test a valid callsign
    'ham n5zno' => test_spice(
        '/js/spice/ham_callsigns/n5zno',
        call_type => 'include',
        caller => 'DDG::Spice::HamCallsigns'
    ),
    'ham lookup w5jdx' => test_spice(
	'/js/spice/ham_callsigns/w5jdx',
	call_type => 'include',
	caller => 'DDG::Spice::HamCallsigns'
    ), 
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    # make sure it doesn't search on anything
    'ham radio' => undef,
    # make sure requires regex
    'ham kbob' => undef,
);

done_testing;

