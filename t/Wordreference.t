#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::Translate) ],
	'translate hello from en to it' => test_spice(
		'/js/spice/translate/enit/hello',
		call_type => 'include',
		caller => 'DDG::Spice::Translate',
		is_cached => 1
	),
);

done_testing;
