#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BikeSharing::BayAreaBikeShareCA )],
    'bike share san francisco' => test_spice(
        '/js/spice/bike_sharing/bay_area_bike_share_ca/san%20francisco',
        call_type => 'include',
        caller => 'DDG::Spice::BikeSharing::BayAreaBikeShareCA',
    is_cached => 0,
    ),
    'bike share stations near san jose' => test_spice(
        '/js/spice/bike_sharing/bay_area_bike_share_ca/san%20jose',
        call_type => 'include',
        caller => 'DDG::Spice::BikeSharing::BayAreaBikeShareCA',
    is_cached => 0,
    ),
    'bike share' => undef,
    'bike sharing new york' => undef,
);

done_testing;
