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
    # Queries with no space between the number and the currency.
    '100cad' => test_spice(
        '/js/spice/currency/100/cad/cad',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Queries with no space between the formatted number and the currency.
    '100,000cad' => test_spice(
        '/js/spice/currency/100000/cad/cad',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Query with everything smushed together.
    '200cadusd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Queries that have "convert" in them.
    'convert 200 cad into usd' => test_spice(
        '/js/spice/currency/200/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Queries with "vs" or "versus" in them.
    'usd vs eur' => test_spice(
        '/js/spice/currency/1/usd/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers with commas in them.
    'convert 2,000 cad into usd' => test_spice(
        '/js/spice/currency/2000/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers with commas and decimal points.
    'convert 2,000.19 cad into usd' => test_spice(
        '/js/spice/currency/2000.19/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers using the european formatting.
    'convert 2.000,19 cad into usd' => test_spice(
        '/js/spice/currency/2000.19/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    'what is 10 php in usd?' => test_spice(
        '/js/spice/currency/10/php/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    # Numbers with with ambiguous formatting.
    'convert 2,000.1.9 cad into usd' => undef,
    # Other types of conversion
    'convert 10 f to c' => undef,
    # Ambiguous queries.
    '100cny 40usd' => undef,
    '10 euro to 10 jpy' => undef,
    # Things that should probably work but it doesn't at the moment.
    'cny jpy 400' => undef,
    '499 cny = ? usd' => undef,
    'convert religion' => undef,
    'what is a cow' => undef,
    'usda' => undef,
    'usda loans' => undef,
    # We don't want to trigger on date-looking things.
    'euro 2016' => undef,
);

done_testing;

