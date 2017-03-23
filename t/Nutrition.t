#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Nutrition )],
    'calories in a banana' => test_spice(
        '/js/spice/nutrition/a%20banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'total calories in an apple' => test_spice(
        '/js/spice/nutrition/an%20apple',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'number of calories from fat in a banana' => test_spice(
        '/js/spice/nutrition/from%20fat%20in%20a%20banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'tofu calories' => test_spice(
        '/js/spice/nutrition/tofu',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    # the IA shouldn't reach these queries at the moment
    'iron in tofu' => undef,
    'fat in 5 pies' => undef
);

done_testing;
