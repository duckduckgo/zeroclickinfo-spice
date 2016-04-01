#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::WordOfTheDay)],
    'word of the day' => test_spice(
        '/js/spice/word_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::WordOfTheDay'
    ),
    'dictionary word of the day' => test_spice(
        '/js/spice/word_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::WordOfTheDay'
    ),
    'word of the day dictionary' => test_spice(
        '/js/spice/word_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::WordOfTheDay'
    ),
    'what is the word of the day' => test_spice(
        '/js/spice/word_of_the_day/',
        call_type => 'include',
        caller => 'DDG::Spice::WordOfTheDay'
    ),
    '' => undef,
    'words of the day' => undef,
    'what is the word day' => undef,
    'word of the day in french' => undef,
    'gimme a word of the day' => undef,
    'I feel so wordy today.' => undef,
);

done_testing;

