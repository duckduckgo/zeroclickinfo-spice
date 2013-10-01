#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;

my $loc = test_location('de');

ddg_spice_test(
    ['DDG::Spice::Forecast'],
    DDG::Request->new(
        query_raw => 'weather forecast',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/${\$loc->latitude}%2C${\$loc->longitude}",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    'weather for Troy, NY' => test_spice(
    	'/js/spice/forecast/troy%2C%20ny',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 0
    )
);

done_testing;
