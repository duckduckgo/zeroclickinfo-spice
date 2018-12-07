#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Metar)],
    'metar KLAX' => test_spice(
        '/js/spice/metar/klax',
        call_type => 'include',
        caller => 'DDG::Spice::Metar'
    ),
    'kjfk metar' => test_spice(
        '/js/spice/metar/kjfk',
        call_type => 'include',
        caller => 'DDG::Spice::Metar'
    ),
    'metar abcde' => undef,
    'fghijk metar' => undef
);

done_testing;

