#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Geometry )],
    'geometry square' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'area rectangle formula' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'calc volume of a cube with size = 5' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'volume of sphere' => test_spice(
        '/js/spice/geometry',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'area of square with size = 5' => test_spice(
        '/js/spice/geometry',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    )
);

done_testing;


