#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RandWord )],
    'random word' => test_spice(
        '/js/spice/rand_word/1-100-1',
        call_type => 'include',
        caller => 'DDG::Spice::RandWord',
    ),
    'random words' => test_spice(
        '/js/spice/rand_word/1-100-10',
        call_type => 'include',
        caller => 'DDG::Spice::RandWord',
    ),
    'random word 5-10' => test_spice(
        '/js/spice/rand_word/5-10-1',
        caller    => 'DDG::Spice::RandWord',
    ),
    '5 random words' => test_spice(
        '/js/spice/rand_word/1-100-5',
        caller    => 'DDG::Spice::RandWord',
    ),
    'print 5 random words' => test_spice(
        '/js/spice/rand_word/1-100-5',
        caller    => 'DDG::Spice::RandWord',
    ),
    '5 random words 7-13' => test_spice(
        '/js/spice/rand_word/7-13-5',
        caller    => 'DDG::Spice::RandWord',
    ),
    # Test max word limit
    '600 random words' => test_spice(
        '/js/spice/rand_word/1-100-500',
        caller    => 'DDG::Spice::RandWord',
    ),
    'random word blah blah' => undef
);

done_testing;

