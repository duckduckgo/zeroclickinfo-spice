#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::FrequencyAllocation)],
    '2400 MHz' => test_spice(
        '/js/spice/frequency_allocation/2400',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    ),
    'frequency 580' => test_spice(
        '/js/spice/frequency_allocation/580',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    ),
    'freq 1450' => test_spice(
        '/js/spice/frequency_allocation/1450',
        call_type => 'include',
        caller => 'DDG::Spice::FrequencyAllocation'
    )
);

done_testing;

