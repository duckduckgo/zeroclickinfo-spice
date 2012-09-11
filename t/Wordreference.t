#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::Wordreference::Translate) ],
	'translate hello from en to it' => test_spice(
		'/js/spice/wordreference/translate/enit/hello',
		call_type => 'include',
		caller => 'DDG::Spice::Wordreference::Translate',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Wordreference::Detect) ],
	'translate hello to it' => test_spice(
		'/js/spice/wordreference/detect/hello/it',
		call_type => 'include',
		caller => 'DDG::Spice::Wordreference::Detect',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Wordreference::Detect) ],
	'translate ciao to en' => test_spice(
		'/js/spice/wordreference/detect/ciao/en',
		call_type => 'include',
		caller => 'DDG::Spice::Wordreference::Detect',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Wordreference::Detect) ],
	'translate bonjour to en' => test_spice(
		'/js/spice/wordreference/detect/bonjour/en',
		call_type => 'include',
		caller => 'DDG::Spice::Wordreference::Detect',
		is_cached => 1
	),
);

done_testing;
