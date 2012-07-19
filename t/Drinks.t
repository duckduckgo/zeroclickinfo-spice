#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Drinks )],
    'what drinks with duck' => test_spice(
        '/js/spice/drinks/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Drinks'
    ),
);

done_testing;

