#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MassOnTime )],
    'catholic mass near Pittsburgh' => test_spice(
        '/js/spice/mass_on_time/mass/Pittsburgh',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near New York' => test_spice(
        '/js/spice/mass_on_time/parish/New%20York',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic Adoration around New York' => test_spice(
        '/js/spice/mass_on_time/adoration/New%20York',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near me' => test_spice(
        '/js/spice/mass_on_time/parish/Phoenixville%2C%20Pennsylvania%2C%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic confessions close by' => test_spice(
        '/js/spice/mass_on_time/confession/Phoenixville%2C%20Pennsylvania%2C%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near here' => test_spice(
        '/js/spice/mass_on_time/parish/Phoenixville%2C%20Pennsylvania%2C%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic Services nearby' => test_spice(
        '/js/spice/mass_on_time/service/Phoenixville%2C%20Pennsylvania%2C%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
);

done_testing;

