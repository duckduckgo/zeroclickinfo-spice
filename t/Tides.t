#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Tides)],
    'tides' => test_spice(
        '/js/spice/tides/40.1246%2C-75.5385', #phoenixville PA
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tide 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'when is high tide?' => test_spice(
        '/js/spice/tides/40.1246%2C-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tides for 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tide for 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tide in 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tides in 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tide times in 02201' => test_spice(
        '/js/spice/tides/02201',
        call_type => 'include',
        caller => 'DDG::Spice::Tides'
    ),
    'tide charts' => undef,
    'xtide' => undef
);

done_testing;

