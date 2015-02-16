#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [ 'DDG::Spice::Cryptocurrency' ],
    'lite coin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ltc/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 ftc' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ftc/ftc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'ltc ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 ltc ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'ltc 500 ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ftc-ltc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 litecoin to ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '100,000 litecoin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ltc/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'litecoin vs. bitcoin' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-btc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert litecoin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ltc/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert litecoin to 30 ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ftc-ltc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'litecoin exchange rate' => test_spice(
        '/js/spice/cryptocurrency/secondaries/ltc/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert 10,000 kryp into jpy' => test_spice(
        '/js/spice/cryptocurrency/ticker/kryp-jpy/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'convert 10,000.55 kryp into jpy' => test_spice(
        '/js/spice/cryptocurrency/ticker/kryp-jpy/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'What is nxt in ltc?' => test_spice(
        '/js/spice/cryptocurrency/ticker/nxt-ltc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    
    # Plural names of coins
    'What is nxt in litecoins?' => test_spice(
        '/js/spice/cryptocurrency/ticker/nxt-ltc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'Convert KimDotCoins to Litecoins?' => test_spice(
        '/js/spice/cryptocurrency/ticker/dot-ltc/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    
    # Edge cases
    '66 666coin to 66coin?' => test_spice(
        '/js/spice/cryptocurrency/ticker/666-66/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    '666coin to 2015 coin?' => test_spice(
        '/js/spice/cryptocurrency/ticker/666-2015/',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    
    # Malformed queries
    'ltc to ltc' => undef,
    'ltc to' => undef,
    # Numbers that should trigger spice.Numbers
    '42' => undef,
    '66' => undef,
    '666' => undef,
    '2015' => undef,
    # Numbers with with ambiguous formatting.
    'convert 200,0000.1.1 ltc into btc' => undef,
    # Other types of conversion
    'convert 32 f to c' => undef,
    # Ambiguous queries.
    '100btc 40ltc' => undef,
    '10 kryp to 10 ltc' => undef,
    # Things that should probably work but it doesn't at the moment.
    'ppc ftc 400' => undef,
    '499 nmc = ? usd' => undef,
    
    'convert religion' => undef,
    'what is a cow' => undef,
    'usda loans' => undef,
    
    # Handled by the Currency Spice.
    'btc' => undef,
    '500 btc in usd' => undef,
    'canada dollar' => undef,
    '400 euro' => undef,
    '499 us dollar to btc' => undef,
    '25 php to gbp' => undef,
    'convert 1021 gbp to cny'  => undef,
    
    # We don't want to trigger on date-looking things.
    '2016 feathercoin' => undef,
    # Doesn't trigger with ficticious currencies
    '200 bitcoin waffles to litecoin' => undef,
    'what is 1 euro in crypto donuts' => undef,
);

done_testing;