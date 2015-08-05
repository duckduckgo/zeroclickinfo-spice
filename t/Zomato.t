#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Zomato)],
    'restaurants in gurgaon' => test_spice(
        '/js/spice/zomato/gurgaon/40.1246/-75.5385/en_US/0/restaurants in gurgaon',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'restaurants in bangalore' => test_spice(
        '/js/spice/zomato/bangalore/40.1246/-75.5385/en_US/0/restaurants in bangalore',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'bad example query' => undef,
);

done_testing;

