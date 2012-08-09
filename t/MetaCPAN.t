#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::MetaCPAN) ],
	'cpan App::DuckPAN' => test_spice(
		'/js/spice/meta_cpan/App%3A%3ADuckPAN',
		call_type => 'include',
		caller => 'DDG::Spice::MetaCPAN',
		is_cached => 1
	),
);

done_testing;
