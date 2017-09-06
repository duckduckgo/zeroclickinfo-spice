#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cryptomarketcap)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
	'btc market cap' => test_spice(
        '/js/spice/cryptomarketcap/bitcoin',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptomarketcap'
    ),
	'ethereum classic rank' => test_spice(
        '/js/spice/cryptomarketcap/ethereum-classic',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptomarketcap'
    ),
	'melon volume' => test_spice(
        '/js/spice/cryptomarketcap/melon',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptomarketcap'
    ),
    'eth price' => test_spice(
        '/js/spice/cryptomarketcap/ethereum',
        call_type => 'include',
        caller => 'DDG::Spice::Cryptomarketcap'
    ),
    'bitcoin total supply' => undef,
    'ethereum volume usdollars' => undef
);

done_testing;

