#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Population)],

    'population of brazil' => test_spice(
        '/js/spice/population/BRA/Brazil',
        call_type => 'include',
        caller => 'DDG::Spice::Population'
    ),
    'population mexico' => test_spice(
        '/js/spice/population/MEX/Mexico',
        call_type => 'include',
        caller => 'DDG::Spice::Population'   
    ),
    'what is the population of china' => test_spice(
        '/js/spice/population/CHN/China',
        call_type => 'include',
        caller => 'DDG::Spice::Population'
    ),
    'pop of spain' => test_spice(
        '/js/spice/population/ESP/Spain',
        call_type => 'include',
        caller => 'DDG::Spice::Population'
    ),
    'population of Earth' => undef,
    'population of New York, USA' => undef,
    'population of California,USA' => undef
);

done_testing;