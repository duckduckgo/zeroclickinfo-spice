#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maps::Places )],
    'nearest any text' => test_spice(
        '/js/spice/maps/places/nearest%20any%20text',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Places',
        is_cached => 0,
    ),
    'nearest walmart' => test_spice(
        '/js/spice/maps/places/nearest%20walmart',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Places',
        is_cached => 0,
    ),
    'walmart' => undef,
    'local time' => undef,
);

done_testing;

