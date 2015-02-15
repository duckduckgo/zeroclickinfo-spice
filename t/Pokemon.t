#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Pokemon::Data)],
    'pikachu pokemon' => test_spice(
        '/js/spice/pokemon/data/pikachu',
        call_type => 'include',
        caller => 'DDG::Spice::Pokemon::Data'
    ),
    'pokemon Charizard' => test_spice(
        '/js/spice/pokemon/data/charizard',
        call_type => 'include',
        caller => 'DDG::Spice::Pokemon::Data'
    ),
    'bulbasaur pokemon stats' => undef,
);

done_testing;

