#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::Quandl::Fundamentals )],
    
    # primary example
    'AAPL revenue' => test_spice(
		'/js/spice/quandl/fundamentals/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Fundamentals',
	),
    
    # order of trigger word should be 
	'sales AAPL' => test_spice(
		'/js/spice/quandl/fundamentals/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Fundamentals',
	),
    
    # CAPS should not deter
	'SALES aapl' => test_spice(
		'/js/spice/quandl/fundamentals/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Fundamentals',
	),
    
    # No results though 'a' is the Agilent ticker and 'debt' is an indicator trigger
    'owe a debt' => undef, 
    
    # No results for a single ticker alone
	'aapl' => undef, 
    
    # No results for a single indicator alone
    'revenue' => undef, 
);


ddg_spice_test(
	[qw( DDG::Spice::Quandl::HomeValues )],
    
    # primary example
    '11235 homes' => test_spice(
		'/js/spice/quandl/home_values/ZIP_ALLHOMES_11235',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # secondary example
    'expensive homes 11235' => test_spice(
		'/js/spice/quandl/home_values/ZIP_TOPTIER_11235',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # No results for a single region alone
	'27510' => undef,
    
    # No results for a single trigger alone
    'homes' => undef, 
);
done_testing;