#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BikeSharing::CitiBikeNYC )],
    'citi bike ny' => test_spice(
        '/js/spice/bike_sharing/citi_bike_nyc/ny',
        call_type => 'include',
        caller => 'DDG::Spice::BikeSharing::CitiBikeNYC',
    is_cached => 0,
    ),
    'citibike stations near brooklyn' => test_spice(
        '/js/spice/bike_sharing/citi_bike_nyc/brooklyn',
        call_type => 'include',
        caller => 'DDG::Spice::BikeSharing::CitiBikeNYC',
    is_cached => 0,
    ),
    'bikeshare queens' => test_spice(
        '/js/spice/bike_sharing/citi_bike_nyc/queens',
        call_type => 'include',
        caller => 'DDG::Spice::BikeSharing::CitiBikeNYC',
    is_cached => 0,
    ),
    'citibike' => undef,
    'citibike washington' => undef,
);

done_testing;
