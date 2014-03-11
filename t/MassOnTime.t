#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MassOnTime )],
    'catholic mass near Pittsburgh' => test_spice(
        '/js/spice/mass_on_time/mass/pittsburgh',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near New York' => test_spice(
        '/js/spice/mass_on_time/parish/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic Adoration around New York' => test_spice(
        '/js/spice/mass_on_time/adoration/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near me' => test_spice(
        '/js/spice/mass_on_time/parish/phoenixville%2C%20pennsylvania%2C%20united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic confessions close by' => test_spice(
        '/js/spice/mass_on_time/confession/phoenixville%2C%20pennsylvania%2C%20united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic churches near here' => test_spice(
        '/js/spice/mass_on_time/parish/phoenixville%2C%20pennsylvania%2C%20united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'catholic Services nearby' => test_spice(
        '/js/spice/mass_on_time/service/phoenixville%2C%20pennsylvania%2C%20united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'New York Catholic churches' => test_spice(
        '/js/spice/mass_on_time/parish/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
    'close catholic Services' => test_spice(
        '/js/spice/mass_on_time/service/phoenixville%2C%20pennsylvania%2C%20united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::MassOnTime'
    ),
);

done_testing;

