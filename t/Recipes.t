#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::Recipes )],
	'tofu ginger recipe' => test_spice(
		'/js/spice/recipes/tofu%20ginger',
		call_type => 'include',
		caller => 'DDG::Spice::Recipes',
	),
	'tofu ginger' => test_spice(
		'/js/spice/recipes/tofu%20ginger',
		call_type => 'include',
		caller => 'DDG::Spice::Recipes',
	),
	'ginger recipes' => test_spice(
		'/js/spice/recipes/ginger',
		call_type => 'include',
		caller => 'DDG::Spice::Recipes',
	),
	'ginger' => undef, # No results for a single ingredient alone
);

done_testing;
