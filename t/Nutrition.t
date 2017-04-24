#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Nutrition )],
    'calories in a banana' => test_spice(
        '/js/spice/nutrition/banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'total calories in an apple' => test_spice(
        '/js/spice/nutrition/apple',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'number of calories from fat in a banana' => test_spice(
        '/js/spice/nutrition/banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'tofu calories' => test_spice(
        '/js/spice/nutrition/tofu',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'banana' => test_spice(
        '/js/spice/nutrition/banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'steak' => test_spice(
        '/js/spice/nutrition/steak',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    )
);

done_testing;
