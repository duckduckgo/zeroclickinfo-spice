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
	'bike service in rouen' => test_spice(
		'/js/spice/cyclocity/in%20rouen',
		call_type => 'include',
		caller => 'DDG::Spice::Cyclocity',
	),
	'bicycle in the city of Montrouge' => test_spice(
		'/js/spice/cyclocity/in%20the%20city%20of%20montrouge',
		call_type => 'include',
		caller => 'DDG::Spice::Cyclocity',
	),
	'shared-bicycle in seville or luxembourg' => test_spice(
		'/js/spice/cyclocity/in%20seville%20or%20luxembourg',
		call_type => 'include',
		caller => 'DDG::Spice::Cyclocity',
	),
	'nantes self-service bike' => test_spice(
		'/js/spice/cyclocity/nantes',
		call_type => 'include',
		caller => 'DDG::Spice::Cyclocity',
	),
);

done_testing;
