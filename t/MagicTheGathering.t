#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::MagicTheGathering)],

    'mtg salvation' => test_spice(
        '/js/spice/magic_the_gathering/salvation',
        call_type => 'include',
        caller => 'DDG::Spice::MagicTheGathering'
    ),

    'mtg cards' => undef,
);

done_testing;
