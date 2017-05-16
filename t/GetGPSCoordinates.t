#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::GetGPSCoordinates)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'gps for paoli, pa' => test_spice(
        '/js/spice/get_gpscoordinates/Paoli%2C%20Pennsylvania',
        call_type => 'include',
        caller => 'DDG::Spice::GetGPSCoordinates'
    ),
    'gps coordinates for philadelphia' => test_spice(
        '/js/spice/get_gpscoordinates/Philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::GetGPSCoordinates'
    ),
    'denver gps coordinates' => test_spice(
        '/js/spice/get_gpscoordinates/Denver',
        call_type => 'include',
        caller => 'DDG::Spice::GetGPSCoordinates'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    #'gps for sale' => undef,
    'gps coordinate conversion' => undef,
    'gps coordinate software' => undef
);

done_testing;

