#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Anime)],
    'anime pokemon' => test_spice(
        '/js/spice/anime/pokemon',
        call_type => 'include',
        caller => 'DDG::Spice::Anime'
    ),
    'anime Medabots' => test_spice(
        '/js/spice/anime/medabots',
        call_type => 'include',
        caller => 'DDG::Spice::Anime'
    )
);

done_testing;

