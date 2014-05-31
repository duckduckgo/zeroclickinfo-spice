#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::Cyclocity )],
	'bike toulouse' => test_spice(
		'/js/spice/cyclocity/toulouse',
		call_type => 'include',
		caller => 'DDG::Spice::Cyclocity',
	),
);

done_testing;
