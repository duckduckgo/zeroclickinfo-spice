#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::Stocks )],
	'stock quote AAPL' => test_spice(
		'/js/spice/stocks/AAPL',
		call_type => 'include',
		caller => 'DDG::Spice::Stocks',
	),
);

done_testing;
