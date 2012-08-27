#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::Wordreference) ],
	'translate hello from en to it' => test_spice(
		'/js/spice/wordreference/enit/hello',
		call_type => 'include',
		caller => 'DDG::Spice::Wordreference',
		is_cached => 1
	),
);

done_testing;
