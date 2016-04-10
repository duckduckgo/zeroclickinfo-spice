#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

sub build_structured_answer {
    my $name = shift;
    my $url = '/js/spice/first_robotics_teams/' . $name;
    return $url,
        call_type => 'include',
        caller => 'DDG::Spice::FirstRoboticsTeams'
}

sub build_test { test_spice(build_structured_answer(@_)) }

ddg_spice_test(
    [qw( DDG::Spice::FirstRoboticsTeams)],

    'frc team 885'                                  => build_test('885'),
    '800 frc team'                                  => build_test('800'),
    'first robotics team 1519'                      => build_test('1519'),
    'where is frc team 811 based'                   => build_test('811'),
    'first robotics competition team 2342'          => build_test('2342'),
    '5687 first robotics competition'               => build_test('5687'),
    'frc 2333'                                      => build_test('2333'),

    'first robotics team'                           => undef,
    'frc stock price'                               => undef,
    'first robotics competition'                    => undef
);

done_testing;

