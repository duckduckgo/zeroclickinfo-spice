#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Automeme )],
    'random meme' => test_spice(
        '/js/spice/automeme/',
        call_type => 'include',
        caller => 'DDG::Spice::Automeme',
        is_unsafe => 1
    ),
    'automeme' => test_spice(
        '/js/spice/automeme/',
        caller    => 'DDG::Spice::Automeme',
        is_unsafe => 1,
    ),
    'meme generator' => test_spice(
        '/js/spice/automeme/',
        caller    => 'DDG::Spice::Automeme',
        is_unsafe => 1,
    ),
);

done_testing;

