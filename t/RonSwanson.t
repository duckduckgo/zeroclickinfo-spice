#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::RonSwanson)],
    'ron swanson hair' => test_spice(
        '/js/spice/ron_swanson/',
        call_type => 'include',
        caller => 'DDG::Spice::RonSwanson',
        is_cached => 0
    ),
    'won sranson' => undef,
    'swanson, ron' => undef,
    'swanson ron' => undef,
);

done_testing;

