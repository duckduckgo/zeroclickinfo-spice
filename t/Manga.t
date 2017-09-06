#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Manga)],
    'naruto manga' => test_spice(
        '/js/spice/manga/naruto',
        call_type => 'include',
        caller => 'DDG::Spice::Manga'
    ),
    'naruto kitsu' => test_spice(
        '/js/spice/manga/naruto',
        call_type => 'include',
        caller => 'DDG::Spice::Manga'
    ),
    'manga Berserk' => test_spice(
        '/js/spice/manga/Berserk',
        call_type => 'include',
        caller => 'DDG::Spice::Manga'
    ),
    'good manga to read' => undef,
    'manga news' => undef,
    'manga wallpapers' => undef,
    'manga couples' => undef,
    'manga creator' => undef
);

done_testing;

