#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::FirstRoboticsTeams)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'frc team 885' => test_spice(
        '/js/spice/first_robotics_teams/885',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'first robotics team 1519' => test_spice(
        '/js/spice/first_robotics_teams/1519',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'where is frc team 811 based' => test_spice(
        '/js/spice/first_robotics_teams/811',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'first robotics competition team 2342' => test_spice(
        '/js/spice/first_robotics_teams/2342',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'frc 2333' => test_spice(
        '/js/spice/first_robotics_teams/2333',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'first robotics team' => undef,
    'frc stock price' => undef,
    'first robotics competition' => undef,
);

done_testing;

