#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::VideoGames )],
    'video game homesick' => test_spice(
        '/js/spice/video_games/homesick',
        call_type => 'include',
        caller => 'DDG::Spice::VideoGames',
    ),
    'unreal video games' => test_spice(
        '/js/spice/video_games/unreal',
        call_type => 'include',
        caller => 'DDG::Spice::VideoGames',
    ),
    'homesick video game' => test_spice(
        '/js/spice/video_games/homesick',
        caller    => 'DDG::Spice::VideoGames',
    ),
);

done_testing;

