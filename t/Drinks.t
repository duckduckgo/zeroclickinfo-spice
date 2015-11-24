#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Drinks )],
    'how to make a white russian' => test_spice(
        '/js/spice/drinks/white%20russian',
        call_type => 'include',
        caller => 'DDG::Spice::Drinks'
    ),
    'how to mix a mojito' => test_spice(
        '/js/spice/drinks/mojito',
        caller    => 'DDG::Spice::Drinks',
    ),
    'mixing a irish spring' => test_spice(
        '/js/spice/drinks/irish%20spring',
        caller    => 'DDG::Spice::Drinks',
    ),
    'ingredients of margarita' => test_spice(
        '/js/spice/drinks/margarita',
        caller    => 'DDG::Spice::Drinks',
    ),
    'red eye cocktail' => test_spice(
        '/js/spice/drinks/red%20eye',
        caller    => 'DDG::Spice::Drinks',
    ),
    'mix a grand-ma in a wheelchair' => test_spice(
        '/js/spice/drinks/grand-ma%20in%20a%20wheelchair',
        caller    => 'DDG::Spice::Drinks',
    ),
    'recipe of bit of russiaan honey' => test_spice(
        '/js/spice/drinks/bit%20of%20russiaan%20honey',
        caller    => 'DDG::Spice::Drinks',
    ),
    'how to mix abilene' => test_spice(
        '/js/spice/drinks/abilene',
        caller    => 'DDG::Spice::Drinks',
    ),
    'drinking cocktails' => undef,
    'how to make money' => undef,
    'how to mix songs' => undef,
    'what ingredients are in chocolate' => undef
);

done_testing;