#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::QuandlFundamentals )],
    
    # primary example
    'AAPL revenue' => test_spice(
		'/js/spice/recipes/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::QuandlFundamentals',
	),
    
    # order of trigger word should be 
	'sales AAPL' => test_spice(
		'/js/spice/recipes/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::QuandlFundamentals',
	),
    
    # CAPS should not deter
	'SALES aapl' => test_spice(
		'/js/spice/recipes/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::QuandlFundamentals',
	),
    
    # extra words at end
	'aapl revenues is what i want' => test_spice(
		'/js/spice/recipes/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::QuandlFundamentals',
	),
    
    # extra words at beginning
    'i want aapl revenues' => test_spice(
		'/js/spice/recipes/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::QuandlFundamentals',
	),
    
    
	'aapl' => undef, # No results for a single ticker alone
    'revenue' => undef, # No results for a single indicator alone
);

done_testing;