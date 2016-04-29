#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [ 'DDG::Spice::Cryptocurrency' ],
    'lite coin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/1litecoin/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 ftc' => test_spice(
        '/js/spice/cryptocurrency/secondaries/500feathercoin/ftc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'ltc ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 ltc ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/500',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'ltc 500 ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ftc-ltc/500',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '500 litecoin to ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-ftc/500',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    '100,000 litecoin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/100000litecoin/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'litecoin vs. bitcoin' => test_spice(
        '/js/spice/cryptocurrency/ticker/ltc-btc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert litecoin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/1litecoin/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert litecoin to 30 ftc' => test_spice(
        '/js/spice/cryptocurrency/ticker/ftc-ltc/30',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'litecoin exchange rate' => test_spice(
        '/js/spice/cryptocurrency/secondaries/1litecoin/ltc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency'
    ),
    'convert 10,000 kryp into jpy' => test_spice(
        '/js/spice/cryptocurrency/ticker/kryp-jpy/10000',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'convert 10,000.55 kryp into jpy' => test_spice(
        '/js/spice/cryptocurrency/ticker/kryp-jpy/10000.55',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'What is nxt in ltc?' => test_spice(
        '/js/spice/cryptocurrency/ticker/nxt-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'eth to usd' => test_spice(
        '/js/spice/cryptocurrency/ticker/eth-usd/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'etherium to jpy' => test_spice(
        '/js/spice/cryptocurrency/ticker/eth-jpy/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'ethereum to ltc' => test_spice(
        '/js/spice/cryptocurrency/ticker/eth-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'ethereum coin to ltc' => test_spice(
        '/js/spice/cryptocurrency/ticker/eth-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'etherium to ltc' => test_spice(
        '/js/spice/cryptocurrency/ticker/eth-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    # Plural names of coins
    'What is nxt in litecoins?' => test_spice(
        '/js/spice/cryptocurrency/ticker/nxt-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    'Convert KimDotCoins to Litecoins?' => test_spice(
        '/js/spice/cryptocurrency/ticker/dot-ltc/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),

    # Edge cases
    '66 666coin to 66coin?' => test_spice(
        '/js/spice/cryptocurrency/ticker/666-66/66',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    '666coin to 2015 coin?' => test_spice(
        '/js/spice/cryptocurrency/ticker/666-2015/1',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    '666coins to 45 2015 coins' => test_spice(
        '/js/spice/cryptocurrency/ticker/2015-666/45',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),

    # Malformed queries
    'ltc to ltc' => undef,
    'ltc to' => undef,
    # Numbers that shouldn't trigger spice.
    '42' => undef,
    '66' => undef,
    '666' => undef,
    '2015' => undef,
    # Words or acronyms that shouldn't trigger spice.
    'ftc?' => undef,
    'BOOM' => undef,
    'Sloths' => undef,
    # Numbers with ambiguous formatting.
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
    'usd to aud' => undef,
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

    # Handling the query '1 <cryptocurrency>'. Doesn't trigger unless cryptocurrency is in the top 10 currencies or the cryptocurrency has 'coin' in the name.
    # Should trigger because PPC is in the top 10
    '1 ppc' => test_spice(
        '/js/spice/cryptocurrency/secondaries/1peercoin/ppc',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
    # Should not trigger because diode is not in the top 10 and name does not include coin
    '1 diode' => undef,
    # Triggers because 'coin' is included in the name
    '1 apex coin' => test_spice(
        '/js/spice/cryptocurrency/secondaries/1apex%20coin/apex',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptocurrency',
    ),
);

done_testing;
