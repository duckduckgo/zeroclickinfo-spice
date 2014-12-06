#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::IndianRailPnrStatus'
    ],
    
    'pnr 4101917424' => test_spice(
        '/js/spice/indian_rail_pnr_status/4101917424',
        call_type => 'include',
        caller => 'DDG::Spice::IndianRailPnrStatus',
        is_cached => 1
    ),
    '4101917424 pnr' => test_spice(
        '/js/spice/indian_rail_pnr_status/4101917424',
        call_type => 'include',
        caller => 'DDG::Spice::IndianRailPnrStatus',
        is_cached => 1
    ),
    'pnr status 4101917424' => test_spice(
        '/js/spice/indian_rail_pnr_status/4101917424',
        call_type => 'include',
        caller => 'DDG::Spice::IndianRailPnrStatus',
        is_cached => 1
    ),
    '4101917424 pnr lookup' => test_spice(
        '/js/spice/indian_rail_pnr_status/4101917424',
        call_type => 'include',
        caller => 'DDG::Spice::IndianRailPnrStatus',
        is_cached => 1
    ),
    'pnr' => undef,
    'pnr abcd' => undef,
    'pnr 123456' => undef,
);


done_testing;
