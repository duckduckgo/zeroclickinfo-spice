#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [ qw( DDG::Spice::Cricket) ],
    'cricket score'     => test_spice(
        '/js/spice/cricket/cricket%20score',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket schedule'  => test_spice(
        '/js/spice/cricket/cricket%20schedule',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket scores'    => test_spice(
        '/js/spice/cricket/cricket%20scores',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'cricket schedules' => test_spice(
        '/js/spice/cricket/cricket%20schedules',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'ipl schedule'      => test_spice(
        '/js/spice/cricket/ipl%20schedule',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'ipl score'         => test_spice(
        '/js/spice/cricket/ipl%20score',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'ipl schedules'     => test_spice(
        '/js/spice/cricket/ipl%20schedules',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
    'ipl scores'        => test_spice(
        '/js/spice/cricket/ipl%20scores',
        call_type => 'include',
        caller    => 'DDG::Spice::Cricket',
    ),
);

done_testing;

