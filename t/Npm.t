#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[qw( DDG::Spice::Npm )],
	'npm underscore' => test_spice(
		'/js/spice/npm/underscore',
		caller => 'DDG::Spice::Npm',
	),
);

done_testing;
