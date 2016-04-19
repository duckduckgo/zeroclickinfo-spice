#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Hex)],
    'hex install httpotion' => test_spice(
        '/js/spice/hex/httpotion',
        call_type => 'include',
        caller => 'DDG::Spice::Hex'
    ),
    'elixir install httpotion' => test_spice(
        '/js/spice/hex/httpotion',
        call_type => 'include',
        caller => 'DDG::Spice::Hex'
    )
);

done_testing;

