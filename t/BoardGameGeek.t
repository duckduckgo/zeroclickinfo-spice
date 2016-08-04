#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw(DDG::Spice::BoardGameGeek::Search)],
    'carcasonne boardgame' => test_spice(
        '/js/spice/board_game_geek/search/carcasonne',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek::Search'
    ),
    'catan board game' => test_spice(
        '/js/spice/board_game_geek/search/catan',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek::Search'
    ),
    'scythe boardgamegeek' => test_spice(
        '/js/spice/board_game_geek/search/scythe',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek::Search'
    ),
    'munchkin card game' => test_spice(
        '/js/spice/board_game_geek/search/munchkin',
        call_type => 'include',
        caller => 'DDG::Spice::BoardGameGeek::Search'
    ),
    'where to buy board games' => undef,
    'board games for kids' => undef,
    'board game geek' => undef,
);

done_testing;
