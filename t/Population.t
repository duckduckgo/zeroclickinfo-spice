#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Population)],

    'population of russia' => test_spice(
        '/js/spice/population/RUS/the%20Russian%20Federation',
        call_type => 'include',
        caller => 'DDG::Spice::Population'
    ),
    'population usa' => test_spice(
        '/js/spice/population/USA/the%20United%20States',
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
);

done_testing;