#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BtcToUsd )],
    # whole numbers
    '1 btc to usd' => test_spice(
        '/js/spice/btc_to_usd/1',
        caller    => 'DDG::Spice::BtcToUsd',
    	is_cached => 1,
    ),
    # decimal places
    '12.34 btc to usd' => test_spice(
        '/js/spice/btc_to_usd/12.34',
        caller    => 'DDG::Spice::BtcToUsd',
    	is_cached => 1,
    ),
    # negative should not be returned
	'-1 btc to usd' => undef,
	
	# multiple numbers should not trigger
	'10 10 btc to usd' => undef,
	
	# case insensitive 
	'1 BTC tO Usd' => test_spice(
        '/js/spice/btc_to_usd/1',
        caller    => 'DDG::Spice::BtcToUsd',
    	is_cached => 1,
    ),
    
);

done_testing;