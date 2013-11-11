#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::AllSportsPeople )], 
	'allsportspeople tiger woods' => test_spice(
		'/js/spice/all_sports_people/tiger%20woods',
		call_type => 'include',
		caller => 'DDG::Spice::AllSportsPeople',
		),
);

done_testing;
