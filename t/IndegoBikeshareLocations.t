#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::indego_bikeshare_locations::IndegoBikeshareLocations )],
    'philly indego' => test_spice(
        '/js/spice/indego_bikeshare_locations/indego_bikeshare_locations/philly',
        call_type => 'include',
        caller => 'DDG::Spice::indego_bikeshare_locations::IndegoBikeshareLocations',
    is_cached => 1,
    ),
 
    'citibike' => undef,
    'citibike washington' => undef,
);

done_testing;