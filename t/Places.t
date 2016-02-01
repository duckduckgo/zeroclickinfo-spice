#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maps::Places )],
    'nearest primos' => test_spice(
        '/js/spice/maps/places/nearest%20primos',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Places',
    is_cached => 0,
    ),
    'local time' => undef,
);

done_testing;

