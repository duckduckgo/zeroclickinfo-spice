#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Parking)],

    DDG::Request->new(
        query_raw =>  'parking san francisco',
        location => test_location('de')
    ) => test_spice(
        '/js/spice/parking/san%20francisco/Europe%2FBerlin',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'parking 21230',
        location => test_location('au')
    ) => test_spice(
        '/js/spice/parking/21230',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'baltimore, md parking',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/baltimore%2C%20md/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'parking near radio city music hall ',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/radio%20city%20music%20hall/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    # Confirm whitespace is handeled correctly
    DDG::Request->new(
        query_raw =>  'parking  near  radio city music hall ',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/radio%20city%20music%20hall/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'where to park near fenway park',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/fenway%20park/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'parking panda washington dc',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/washington%20dc/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'parking lots near nyc upper west side',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/nyc%20upper%20west%20side/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    DDG::Request->new(
        query_raw =>  'parking lots nyc upper west side',
        location => test_location('us')
    ) => test_spice(
        '/js/spice/parking/nyc%20upper%20west%20side/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::Parking'
    ),

    # don't search for parking near 'panda' or 'lots'
    'parking panda !' => undef,
    'parking panda' => undef,
    'parking lots' => undef,
);

done_testing;

