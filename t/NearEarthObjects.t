#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::NearEarthObjects)],
    'near earth objects' => test_spice(
        '/js/spice/near_earth_objects/',
        call_type => 'include',
        caller => 'DDG::Spice::NearEarthObjects'
    ),
    'near-earth asteroids' => test_spice(
        '/js/spice/near_earth_objects/',
        call_type => 'include',
        caller => 'DDG::Spice::NearEarthObjects'
    ),
    'what are near earth objects' => undef,
    'asteroids game' => undef
);

done_testing;
