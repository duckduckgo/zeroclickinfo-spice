#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
	[ qw(DDG::Spice::RandNums) ],
	'random nums' => test_spice(
		'/js/spice/rand_nums/1/100',
		call_type => 'include',
		caller    => 'DDG::Spice::RandNums',
	),
	'random numbers 1 50' => test_spice(
		'/js/spice/rand_nums/1/50',
		call_type => 'include',
		caller    => 'DDG::Spice::RandNums',
	),
    'random numbers 10 11' => test_spice(
        '/js/spice/rand_nums/10/11',
        caller    => 'DDG::Spice::RandNums',
    ),
);

done_testing;
