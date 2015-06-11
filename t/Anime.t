#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Anime)],
    'naruto anime' => test_spice(
        '/js/spice/anime/naruto',
        call_type => 'include',
        caller => 'DDG::Spice::Anime'
    ),
    'naruto hummingbird' => test_spice(
        '/js/spice/anime/naruto',
        call_type => 'include',
        caller => 'DDG::Spice::Anime'
    ),
    'anime Medabots' => test_spice(
        '/js/spice/anime/Medabots',
        call_type => 'include',
        caller => 'DDG::Spice::Anime'
    ),
    'good anime to watch' => undef
);

done_testing;

