#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

sub build_structured_answer {
    my $name = shift;
    my $url = '/js/spice/first_robotics/team_info/' . $name;
    return $url,
        call_type => 'include',
        caller => 'DDG::Spice::FirstRobotics::TeamInfo'
}

sub build_test { test_spice(build_structured_answer(@_)) }

ddg_spice_test(
    [qw( DDG::Spice::FirstRobotics::TeamInfo )],

    'frc team 885'                                  => build_test('885'),
    '800 frc team'                                  => build_test('800'),
    'first robotics team 1519'                      => build_test('1519'),
    'first robotics competition team 2342'          => build_test('2342'),
    '5687 first robotics competition'               => build_test('5687'),
    'frc 2333'                                      => build_test('2333'),

    'first robotics team'                           => undef,
    'frc stock price'                               => undef,
    'first robotics competition'                    => undef,
    'top 5 frc teams'                               => undef,
    '10 best frc teams'                             => undef,
    '20 highest ranked frc teams'                   => undef,
    'where is frc team 811 based'                   => undef
);

done_testing;

