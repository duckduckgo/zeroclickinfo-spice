#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RandWord )],
    'what randword with duck' => test_spice(
        '/js/spice/rand_word/duck',
        call_type => 'include',
        caller => 'DDG::Spice::RandWord'
    ),
);

done_testing;

