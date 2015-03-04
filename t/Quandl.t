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
    
    # extra words at end
	'aapl revenues is what i want' => test_spice(
		'/js/spice/quandl/fundamentals/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Fundamentals',
	),
    
    # extra words at beginning
    'i want aapl revenues' => test_spice(
		'/js/spice/quandl/fundamentals/AAPL_REVENUE',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Fundamentals',
	),
    
    'price of a coke' => undef, # No results though 'a' is the Agilent ticker
	'aapl' => undef, # No results for a single ticker alone
    'revenue' => undef, # No results for a single indicator alone
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
    
	'27510' => undef, # No results for a single region alone
    'homes' => undef, # No results for a single trigger alone
);
done_testing;