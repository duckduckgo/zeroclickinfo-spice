#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Congress )],
    'ny representatives' => test_spice(
        '/js/spice/congress/house/ny',
        call_type => 'include',
        caller => 'DDG::Spice::Congress'
    ),
    'new york senators' => test_spice(
        '/js/spice/congress/senate/ny',
        caller    => 'DDG::Spice::Congress',
    ),
    'florida representatives' => test_spice(
        '/js/spice/congress/house/fl',
        caller    => 'DDG::Spice::Congress',
    ),
    'house california' => test_spice(
        '/js/spice/congress/house/ca',
        caller    => 'DDG::Spice::Congress',
    ),
);

done_testing;

