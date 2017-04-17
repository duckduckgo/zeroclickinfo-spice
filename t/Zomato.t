#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Zomato)],
    'restaurants in gurgaon' => test_spice(
        '/js/spice/zomato/restaurant/gurgaon/40.1246/-75.5385/en_US/0/restaurants%20in%20gurgaon',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'bars in bangalore' => test_spice(
        '/js/spice/zomato/bar/bangalore/40.1246/-75.5385/en_US/0/bars%20in%20bangalore',
        call_type => 'include',
        caller => 'DDG::Spice::Zomato'
    ),
    'bad example query' => undef,
);

done_testing;

