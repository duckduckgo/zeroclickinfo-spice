#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Drinks )],
    'how to make a white russian drink' => test_spice(
        '/js/spice/drinks/white%20russian',
        call_type => 'include',
        caller => 'DDG::Spice::Drinks'
    ),
    'how to mix a tom collins' => test_spice(
        '/js/spice/drinks/tom%20collins',
        caller    => 'DDG::Spice::Drinks',
    ),
    'mixing a 007' => test_spice(
        '/js/spice/drinks/007',
        caller    => 'DDG::Spice::Drinks',
    ),
    'how to make a 1.21 gigawatts drink' => test_spice(
        '/js/spice/drinks/1.21%20gigawatts',
        caller    => 'DDG::Spice::Drinks',
    ),
    'ice tea drink ingredients' => test_spice(
	'/js/spice/drinks/ice%20tea',
        caller    => 'DDG::Spice::Drinks',
    ),
    'how to make a rails4 backend' => undef,
    'making a pizza' => undef,
);

done_testing;

