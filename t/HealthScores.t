#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::HealthScores )],

    # It should respond to "* health score"
    'andina portland health score' => test_spice(
        '/js/spice/health_scores/andina%20portland',
        call_type => 'include',
        caller => 'DDG::Spice::HealthScores'
    ),

    # It should respond to "* health scores"
    'nyc pizza health scores' => test_spice(
        '/js/spice/health_scores/nyc%20pizza',
        call_type => 'include',
        caller => 'DDG::Spice::HealthScores'
    ),

    # It should respond to "health score *"
    'health score pizza nyc' => test_spice(
        '/js/spice/health_scores/pizza%20nyc',
        call_type => 'include',
        caller => 'DDG::Spice::HealthScores'
    ),

    # It should respond to "health scores *"
    'health scores mcdonalds portland' => test_spice(
        '/js/spice/health_scores/mcdonalds%20portland',
        call_type => 'include',
        caller => 'DDG::Spice::HealthScores'
    ),
);

done_testing;
