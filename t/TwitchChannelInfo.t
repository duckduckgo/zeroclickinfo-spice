#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Twitch::ChannelInfo)],
    'twitch starladder' => test_spice(
        '/js/spice/twitch/channel_info/starladder',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    'twitch riotgames' => test_spice(
        '/js/spice/twitch/channel_info/riotgames',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    'twitchtv esl_csgo' => test_spice(
        '/js/spice/twitch/channel_info/esl_csgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    'PhantomL0rd twitch' => test_spice(
        '/js/spice/twitch/channel_info/PhantomL0rd',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    'twitchtv summit1g' => test_spice(
        '/js/spice/twitch/channel_info/summit1g',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    
    'lorem ipsum' => undef,
    '#undefined#' => undef,
    '1twitch1' => undef,
);

done_testing;