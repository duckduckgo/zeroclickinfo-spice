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
);

done_testing;
