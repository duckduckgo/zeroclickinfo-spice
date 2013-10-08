#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

my @triggers = [
    'cpan',
    'cpanm',
    'meta cpan',
    'metacpan',
];

ddg_spice_test(
	[ qw(DDG::Spice::MetaCPAN) ],
	map { "$_ App::DuckPAN" => test_spice(
		'/js/spice/meta_cpan/App%3A%3ADuckPAN',
		caller => 'DDG::Spice::MetaCPAN',
        )
    }, @triggers,
);

done_testing;
