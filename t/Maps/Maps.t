#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use DDG::Test::Location;
use DDG::Request;

use_ok('DDG::Spice::Maps::Maps');

ddg_spice_test(
    [qw( DDG::Spice::Maps::Maps )],
    'directions to florida' => test_spice(
        '/js/spice/maps/maps/florida',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Maps',
        is_cached => 0,
    ),
    'driving directions to 10 canal street new york' => test_spice(
        '/js/spice/maps/maps/10%20canal%20street%20new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Maps',
        is_cached => 0,
    ),
    'directions from leeds to skipton uk' => test_spice(
        '/js/spice/maps/maps/skipton%20uk',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Maps',
        is_cached => 0,
    ),
    'mapbox api' => undef,
    'js map array' => undef,
    'google directions' => undef,
    'driving directions from one place to another' => undef,
    'bing map' => undef,
);

done_testing;
