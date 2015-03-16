#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Congress )],
    'ny representatives' => test_spice(
        '/js/spice/congress/house/NY',
        call_type => 'include',
        caller => 'DDG::Spice::Congress'
    ),
    'new york senators' => test_spice(
        '/js/spice/congress/senate/NY',
        caller => 'DDG::Spice::Congress',
    ),
    'florida representatives' => test_spice(
        '/js/spice/congress/house/FL',
        caller => 'DDG::Spice::Congress',
    ),
    'house california' => test_spice(
        '/js/spice/congress/house/CA',
        caller => 'DDG::Spice::Congress',
    ),
);

done_testing;
