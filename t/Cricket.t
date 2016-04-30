#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [ qw( DDG::Spice::Cricket) ],
    'cricket score'     => test_spice(
        '/js/spice/cricket/',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket schedule'  => test_spice(
        '/js/spice/cricket/',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket scores'    => test_spice(
        '/js/spice/cricket/',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket schedules' => test_spice(
        '/js/spice/cricket/',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'live cricket score' => test_spice(
        '/js/spice/cricket/live',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
);

done_testing;

