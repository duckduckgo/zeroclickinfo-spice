#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Parking)],

    'parking san francisco' => test_spice(
        '/js/spice/parking/san%20francisco',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'baltimore, md parking' => test_spice(
        '/js/spice/parking/baltimore%2C%20md',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'parking near radio city music hall ' => test_spice(
        '/js/spice/parking/radio%20city%20music%20hall',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    # Confirm whitespace is handeled correctly
    'parking  near  radio city music hall ' => test_spice(
        '/js/spice/parking/radio%20city%20music%20hall',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'where to park near fenway park' => test_spice(
        '/js/spice/parking/fenway%20park',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'parking panda washington dc' => test_spice(
        '/js/spice/parking/washington%20dc',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'parking lots near nyc upper west side' => test_spice(
        '/js/spice/parking/nyc%20upper%20west%20side',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    'parking lots nyc upper west side' => test_spice(
        '/js/spice/parking/nyc%20upper%20west%20side',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),
    
    # don't search for parking near 'panda' or 'lots'
    'parking panda !' => undef,
    'parking panda' => undef,
    'parking lots' => undef,
);

done_testing;

