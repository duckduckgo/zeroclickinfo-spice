#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use_ok('DDG::Spice::NPM');

ddg_spice_test(
	[qw(
		DDG::Spice::NPM
	)],
	'npm socket-io' => test_zci('socket-io'),
	'npm async' => test_zci('async'),
);

done_testing;