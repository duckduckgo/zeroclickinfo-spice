#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::IndegoBikeshareLocations )],
    'indego bikeshare philly' => test_spice(
        '/js/spice/indego_bikeshare_locations/indego_bikeshare_locations',
        call_type => 'include',
        caller => 'DDG::Spice::IndegoBikeshareLocations',
    is_cached => 1,
    ),
  
    'indego' => undef,
    'indego washington' => undef,
);

done_testing;

