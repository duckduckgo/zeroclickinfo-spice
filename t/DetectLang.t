#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::DetectLang) ],
	'detect language something' => test_spice(
		'/js/spice/detect_lang/something',
		caller    => 'DDG::Spice::DetectLang'
	)
);

done_testing;
