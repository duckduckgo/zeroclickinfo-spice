#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::BoardGameGeek)],
    'carcasonne boardgame' => test_spice(
        '/js/spice/board_game_geek/carcasonne',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek'
    ),
    'catan board game' => test_spice(
        '/js/spice/board_game_geek/catan',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek'
    ),
    'munchkin card game' => test_spice(
        '/js/spice/board_game_geek/munchkin',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek'
    ),
    'where to buy board games' => undef,
    'board games for kids' => undef,
    'board game geek' => undef,
);

done_testing;

