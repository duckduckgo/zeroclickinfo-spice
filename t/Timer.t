#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

my @test_args = (
    '',
    call_type => 'self',
    caller => 'DDG::Spice::Timer'
);

ddg_spice_test(
    [
        'DDG::Spice::Timer'
    ],
    'timer' => test_spice(@test_args),
    'timer 15 mins' => test_spice(@test_args),
    'timer 77 mins 13 secs' => test_spice(@test_args),
    'online timer' => test_spice(@test_args),
    'timer online' => test_spice(@test_args),
    '1 minute timer' => test_spice(@test_args),
    '2min30sec online timer' => test_spice(@test_args),
    '3 hr 5 min timer' => test_spice(@test_args),
    'timer 30 seconds' => test_spice(@test_args),
    'time 2 minutes' => test_spice(@test_args),
    '3.5 minute timer' => test_spice(@test_args),
    'alarm 30 minutes' => test_spice(@test_args),
    'timer for 15 mins' => test_spice(@test_args),
    'timer for 77 mins 13 secs' => test_spice(@test_args),
    'blahblah timer' => undef,
    'wwdc 2015 countdown' => undef,
    'timer 5 hellos' => undef,
    'time' => undef
);

done_testing;
