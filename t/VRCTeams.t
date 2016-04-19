#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::VRC::Teams)],
    'vex team 765A' => test_spice(
        '/js/spice/vrc/teams/765A',
        call_type => 'include',
        caller => 'DDG::Spice::VRC::Teams'
    ),
    'vrc aura' => test_spice(
        '/js/spice/vrc/teams/aura',
        call_type => 'include',
        caller => 'DDG::Spice::VRC::Teams'
    ),
    'vex team scores' => undef,
    'awesome vrc team' => undef
);

done_testing;
