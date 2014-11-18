#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::VtBeerTrail )],
	'vermont breweries' => test_spice(
		'/js/spice/vt_beer_trail/breweries',
		call_type => 'include',
		caller => 'DDG::Spice::VtBeerTrail',
	),
	'vermont beer' => test_spice(
		'/js/spice/vt_beer_trail/beer',
		call_type => 'include',
		caller => 'DDG::Spice::VtBeerTrail',
	),
);

done_testing;
