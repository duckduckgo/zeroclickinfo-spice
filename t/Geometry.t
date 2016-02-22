#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Geometry )],
    #tests for queries that display all formulas of a given shape
    'geometry sphere' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'formulas square' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'formulas rectangle a=5 b=6' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    
    #tests for queries that display a specific formula of a given shape
    'area square' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'diagonal rectangle' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'perimeter equilateral triangle' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'circumference circle' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'surface cube' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'diagonal cuboid' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'volume sphere' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    
    #tests for which the spice fails
    'perimeter of ball' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'circumference of disk' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    'area of cone' => test_spice(
        '/js/spice/geometry/',
        call_type => 'self',
        caller => 'DDG::Spice::Geometry'
    ),
    
    #tests that do not trigger the spice
    'rectangle area formula' => undef,
    'formula for area of a sphere' => undef,
    'sphere equations' => undef,
    'the geometry of a square' => undef,
    'rectangle formulas a=5 b=6' => undef
);

done_testing;

