#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::PHLBikeshare::IndegoBikeshareLocations )],
    'indego bike philly' => test_spice(
        '/js/spice/phlbikeshare/indegobikesharelocations',
        call_type => 'include',
        caller => 'DDG::Spice::PHLBikeshare::IndegoBikeshareLocations',
    is_cached => 1,
    ),
    'philly bikeshare locations' => test_spice(
        '/js/spice/phlbikeshare/indegobikesharelocations',
        call_type => 'include',
        caller => 'DDG::Spice::PHLBikeshare::IndegoBikeshareLocations',
    is_cached => 1,
    ),
    'indego' => undef,
    'indego washington' => undef,
);

done_testing;