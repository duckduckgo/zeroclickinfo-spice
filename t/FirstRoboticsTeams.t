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
        '/js/spice/first_robotics_teams/query',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'first robotics team 1519' => test_spice(
        '/js/spice/first_robotics_teams/query',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'where is frc team 811 based' => test_spice(
        '/js/spice/first_robotics_teams/query',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'first robotics competition team 2342' => test_spice(
        '/js/spice/first_robotics_teams/query',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    'frc2333' => test_spice(
        '/js/spice/first_robotics_teams/query',
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

