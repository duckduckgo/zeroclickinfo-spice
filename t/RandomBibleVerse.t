#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::RandomBibleVerse)],
    'bible verse' => test_spice(
        '/js/spice/random_bible_verse',
         call_type => 'include',
        caller => 'DDG::Spice::RandomBibleVerse',
    ),
    'random bible verse' => test_spice(
        '/js/spice/random_bible_verse',
        call_type => 'include',
        caller => 'DDG::Spice::RandomBibleVerse'
    ),
    'random bible verses' => undef,
    'bible verses' => undef,
    'verses bible' => undef
);

done_testing;

