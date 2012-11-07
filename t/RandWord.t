#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RandWord )],
    'random word' => test_spice(
        '/js/spice/rand_word/0-100',
        call_type => 'include',
        caller => 'DDG::Spice::RandWord',
        is_cached => 0
    ),
);

done_testing;

