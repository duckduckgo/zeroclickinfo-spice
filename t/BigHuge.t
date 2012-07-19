#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BigHuge )],
    'what bighuge with duck' => test_spice(
        '/js/spice/big_huge/duck',
        call_type => 'include',
        caller => 'DDG::Spice::BigHuge'
    ),
);

done_testing;

