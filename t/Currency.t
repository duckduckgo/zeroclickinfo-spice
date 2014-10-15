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
        '/js/spice/currency/1/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '400 euro' => test_spice(
        '/js/spice/currency/400/eur/usd',
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
    '100cad' => test_spice(
        '/js/spice/currency/100/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '200cadusd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 200 cad into usd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'convert 10 f to c' => undef,
    '100cny 40usd' => undef,
    'cny jpy 400' => undef,
    '10 euro to 10 jpy' => undef,
    '499 cny = ? usd' => undef,
);

done_testing;

