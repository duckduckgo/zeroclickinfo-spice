#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Forecast )],
    'weather forecast' => test_spice(
        "/js/spice/forecast/${\$loc->latitude},${\$loc->longitude}",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
    ),
    'weather for Troy, NY' => test_spice(
    	'/js/spice/forecast/troy%2C%20ny',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
    )
);

done_testing;
