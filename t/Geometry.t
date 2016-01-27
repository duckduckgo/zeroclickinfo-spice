#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Geometry )],
    'geometry sphere' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'diagonal rectangle formula' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'calc volume of a cube with size = 5' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'area of circle' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'perimeter of square' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    )
);

done_testing;

