#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GameInfo )],
    'game homesick' => test_spice(
        '/js/spice/game_info/homesick',
        call_type => 'include',
        caller => 'DDG::Spice::GameInfo',
    ),
    'unreal games' => test_spice(
        '/js/spice/game_info/unreal',
        call_type => 'include',
        caller => 'DDG::Spice::GameInfo',
    ),
);

done_testing;

