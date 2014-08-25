#!/usr/bin/env perl
#@xe.com
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Currency'
    ],
    'canada dollar' => test_spice(
        '/js/spice/currency/1/cad/cad',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '400 euro' => test_spice(
        '/js/spice/currency/400/eur/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'euro cny' => test_spice(
        '/js/spice/currency/1/eur/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '400 eur cny' => test_spice(
        '/js/spice/currency/400/eur/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'euro 400 jpy' => test_spice(
        '/js/spice/currency/400/jpy/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'cny jpy 400' => test_spice(
        '/js/spice/currency/400/cny/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '10 euro to 10 jpy' => => test_spice(
        '/js/spice/currency/10/eur/jpy',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 cny = ? usd' => test_spice(
        '/js/spice/currency/499/cny/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 us dollar to euro' => test_spice(
        '/js/spice/currency/499/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 1021 gbp to cny' => test_spice(
        '/js/spice/currency/1021/gbp/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
  
    '100cad' => undef,
    '200cadusd' => undef,
    '100cny 40usd' => undef,
);

done_testing;

