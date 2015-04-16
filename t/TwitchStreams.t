#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Twitch::Streams'
    ],
    'twitch streams dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch streams world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch streams monstercat' => test_spice(
        '/js/spice/twitch/streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streams dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streams world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streams monstercat' => test_spice(
        '/js/spice/twitch/streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'streams twitch dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'streams twitch world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'streams twitch monstercat' => test_spice(
        '/js/spice/twitch/streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch streaming dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch streaming world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch streaming monstercat' => test_spice(
        '/js/spice/twitch/streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streaming dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streaming world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv streaming monstercat' => test_spice(
        '/js/spice/twitch/streams/monstercat',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch.tv streaming dota 2' => test_spice(
        '/js/spice/twitch/streams/dota%202',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'twitch.tv streaming world of warcraft' => test_spice(
        '/js/spice/twitch/streams/world%20of%20warcraft',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::Streams',
        proxy_cache_valid => "418 1d"
    ),
    'about twitch' => undef, 
    'twitch streams' => undef, 
);

done_testing;
