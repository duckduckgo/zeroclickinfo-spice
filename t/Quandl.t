#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# to run tests use the following command:
# prove -Ilib t/Quandl.t

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
    
    # primary zip example
    '11235 homes' => test_spice(
		'/js/spice/quandl/home_values/Z11235_A',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # secondary zip example
    'expensive homes 11235' => test_spice(
		'/js/spice/quandl/home_values/Z11235_TT',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # metro example, is not caught by 'new york' trigger
    'new york city homes' => test_spice(
		'/js/spice/quandl/home_values/M00002_A',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    # state example
    'new york homes' => test_spice(
		'/js/spice/quandl/home_values/S00003_A',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::HomeValues',
	),
    
    
    # No results for a single region alone
	'27510' => undef,
    'new york' => undef,
    'raleigh' => undef,
    
    # No results for a single trigger alone
    'homes' => undef,
);


ddg_spice_test(
	[qw( DDG::Spice::Quandl::WorldBank )],
    
    'world population' => test_spice(
		'/js/spice/quandl/world_bank/WLD_SP_POP_TOTL',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::WorldBank',
	),
    
    'population world' => test_spice(
		'/js/spice/quandl/world_bank/WLD_SP_POP_TOTL',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::WorldBank',
	),
    
    'world female population' => test_spice(
		'/js/spice/quandl/world_bank/WLD_SP_POP_TOTL_FE_ZS',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::WorldBank',
	),
   
    # No results for a single region alone
	'world' => undef,
    'us' => undef,
    
    'population' => undef, 
);

ddg_spice_test(
	[qw( DDG::Spice::Quandl::Commodities )],
    
    'aluminum alloy prices' => test_spice(
		'/js/spice/quandl/commodities/OFDP-ALUMINIUMALLOY_11',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Commodities',
	),
    
    'aluminum prices' => test_spice(
		'/js/spice/quandl/commodities/OFDP-ALUMINIUM_21',
		call_type => 'include',
		caller => 'DDG::Spice::Quandl::Commodities',
	),
    
    'aluminum' => undef,
    'price' => undef,
);


done_testing;