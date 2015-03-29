#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::TwitchStreams'
    ],
    'twitch streams dota 2' => test_spice(
        '/js/spice/twitch_streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchStreams',
        is_cached => 0
    ),
    'twitch streams world of warcraft' => test_spice(
        '/js/spice/twitch_streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchStreams',
        is_cached => 0
    ),
    'twitch streams monstercat' => test_spice(
        '/js/spice/twitch_streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchStreams',
        is_cached => 0
    ),
    'about twitch' => undef, 
    'twitch streams' => undef, 
);

done_testing;
