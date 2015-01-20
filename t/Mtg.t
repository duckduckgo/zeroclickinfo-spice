#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Mtg'
    ],

    'mtg nullify' => test_spice(
        '/js/spice/mtg/nullify',
        call_type => 'include',
        caller => 'DDG::Spice::Mtg',
        is_cached => 1
    ),
    'magic Boros Reckoner' => test_spice(
        '/js/spice/mtg/Boros%20Reckoner',
        call_type => 'include',
        caller => 'DDG::Spice::Mtg',
        is_cached => 1
    ),
    'magic the gathering nullify' => test_spice(
        '/js/spice/mtg/nullify',
        call_type => 'include',
        caller => 'DDG::Spice::Mtg',
        is_cached => 1
    ),

    'mtg' => undef,
    'magi3 the gatheri' => undef
);

done_testing;
