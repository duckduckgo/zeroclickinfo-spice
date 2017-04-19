#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::FrequencyAllocation)],
    '2400 MHz' => test_spice(
        '/js/spice/frequency_allocation/2400/2401',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    ),
    'MHz 580' => test_spice(
        '/js/spice/frequency_allocation/580/581',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    ),
    '1450 mhz' => test_spice(
        '/js/spice/frequency_allocation/1450/1451',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    ),
    'frequency 2400' => undef,
    '2400 KHz' => undef,
);

done_testing;

