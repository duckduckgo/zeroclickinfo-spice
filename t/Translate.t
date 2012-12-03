#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::Translate::Basic) ],
	'translate hello from en to it' => test_spice(
		'/js/spice/translate/basic/enit/hello',
		call_type => 'include',
		caller => 'DDG::Spice::Translate::Basic',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Translate::Detect) ],
	'translate hello to it' => test_spice(
		'/js/spice/translate/detect/hello/it',
		call_type => 'include',
		caller => 'DDG::Spice::Translate::Detect',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Translate::Detect) ],
	'translate ciao to en' => test_spice(
		'/js/spice/translate/detect/ciao/en',
		call_type => 'include',
		caller => 'DDG::Spice::Translate::Detect',
		is_cached => 1
	),
);

ddg_spice_test(
	[ qw(DDG::Spice::Translate::Detect) ],
	'translate bonjour to en' => test_spice(
		'/js/spice/translate/detect/bonjour/en',
		call_type => 'include',
		caller => 'DDG::Spice::Translate::Detect',
		is_cached => 1
	),
);

done_testing;
