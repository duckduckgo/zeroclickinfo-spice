#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Aqi'
    ],
    'aqi 20002' => test_spice(
        '/js/spice/aqi/20002',
        call_type => 'include',
        caller => 'DDG::Spice::Aqi',
    ),
    '20002 aqi' => test_spice(
        '/js/spice/aqi/20002',
        call_type => 'include',
        caller => 'DDG::Spice::Aqi',
    ),
    'air quality 20002' => test_spice(
        '/js/spice/aqi/20002',
        call_type => 'include',
        caller => 'DDG::Spice::Aqi',
    ),
    'air quality index 20002' => test_spice(
        '/js/spice/aqi/20002',
        call_type => 'include',
        caller => 'DDG::Spice::Aqi',
    ),
    'air pollution 20002' => test_spice(
        '/js/spice/aqi/20002',
        call_type => 'include',
        caller => 'DDG::Spice::Aqi',
    ),
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
