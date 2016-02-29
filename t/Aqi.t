#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

my @test_20002 = (
    '/js/spice/aqi/20002',
    call_type => 'include',
    caller => 'DDG::Spice::Aqi',
);

my @test_19460 = (
    '/js/spice/aqi/19460',
    call_type => 'include',
    caller => 'DDG::Spice::Aqi',
);

ddg_spice_test(
    [
        'DDG::Spice::Aqi'
    ],

    # zip code testing
    'aqi 20002' => test_spice(@test_20002),
    '20002 aqi' => test_spice(@test_20002),
    'air quality 20002' => test_spice(@test_20002),
    'air quality index 20002' => test_spice(@test_20002),
    'air pollution 20002' => test_spice(@test_20002),

    # Test user location
    DDG::Request->new(
        query_raw => 'local air quality',
        location => test_location('us')
    ) => test_spice(@test_19460),

    DDG::Request->new(
        query_raw => 'local aqi',
        location => test_location('us')
    ) => test_spice(@test_19460),

    DDG::Request->new(
        query_raw => 'current air pollution',
        location => test_location('us')
    ) => test_spice(@test_19460),

    DDG::Request->new(
        query_raw => 'air quality',
        location => test_location('us')
    ) => test_spice(@test_19460),

    # invalid location (non-us)
    DDG::Request->new(
        query_raw => 'local air quality',
        location => test_location('de')
    ) => undef,

    # test additional queries that include "local"
    'local news air quality' => undef,
    'air quality affects locals' => undef,

    # aqi alone shouldn't detect loction. Trigger is too generic.
    'aqi' => undef,

    # wrong ZIP formatting
    'aqi 1' => undef,
    'aqi 12' => undef,
    'aqi 123' => undef,
    'aqi 1234' => undef,
    'aqi 123456' => undef,

    # city names unfortunately not supported yet
    'aqi New York' => undef,
);

done_testing;
