#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::TwitchFeatured'
    ],
    'twitch featured' => test_spice(
        '/js/spice/twitch_featured/',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchFeatured',
        proxy_cache_valid => "418 1d"
    ),
    'twitchtv featured' => test_spice(
        '/js/spice/twitch_featured/',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchFeatured',
        proxy_cache_valid => "418 1d"
    ),
    'featured twitch' => test_spice(
        '/js/spice/twitch_featured/',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchFeatured',
        proxy_cache_valid => "418 1d"
    ),
    'featured twitchtv' => test_spice(
        '/js/spice/twitch_featured/',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchFeatured',
        proxy_cache_valid => "418 1d"
    ),  
    'twitch featured insert random stuff' => undef, 
    'what is twitch featured' => undef,
    'about twitch' => undef,
);

done_testing;
