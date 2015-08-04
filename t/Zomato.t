#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Zomato)],
    'restaurants in gurgaon' => test_spice(
        '/gurgaon',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'restaurants in bangalore' => test_spice(
        '/bangalore',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'bad example query' => undef,
);

done_testing;

