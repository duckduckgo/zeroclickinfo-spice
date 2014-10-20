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
    'protein in tilapia' => test_spice(
        '/js/spice/nutrition/tilapia',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'vitamin c in an orange' => test_spice(
        '/js/spice/nutrition/orange',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'trans-fat in a ribeye steak' => test_spice(
        '/js/spice/nutrition/ribeye%20steak',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'how many carbs in brown rice' => test_spice(
        '/js/spice/nutrition/brown%20rice',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'is there iron in turkey?' => test_spice(
        '/js/spice/nutrition/turkey',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'amount of fiber in kale' => test_spice(
        '/js/spice/nutrition/kale',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'number of calories from fat in a banana' => test_spice(
        '/js/spice/nutrition/banana',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'monounsaturated fat in chicken breast' => test_spice(
        '/js/spice/nutrition/chicken%20breast',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'total calcium in glass of milk' => test_spice(
        '/js/spice/nutrition/glass%20of%20milk',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'are there carbs in mashed potatoes?' => test_spice(
        '/js/spice/nutrition/mashed%20potatoes',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'how much sugar is in blueberries?' => test_spice(
        '/js/spice/nutrition/blueberries',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    ),
    'saturated fat in spam' => test_spice(
        '/js/spice/nutrition/spam',
        call_type => 'include',
        caller => 'DDG::Spice::Nutrition',
    )
);

done_testing;
