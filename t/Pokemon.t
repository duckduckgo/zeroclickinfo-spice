#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Pokemon)],
    'pikachu pokemon' => test_spice(
        '/js/spice/pokemon/pikachu',
        call_type => 'include',
        caller => 'DDG::Spice::Pokemon'
    ),
    'pokemon Charizard' => test_spice(
        '/js/spice/pokemon/charizard',
        call_type => 'include',
        caller => 'DDG::Spice::Pokemon'
    ),
    'bulbasaur pokemon stats' => undef,
);

done_testing;

