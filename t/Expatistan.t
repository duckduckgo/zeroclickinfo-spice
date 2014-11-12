#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Expatistan )],
    'cost of living in nyc' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20in%20nyc',
        call_type => 'include',
        caller => 'DDG::Spice::Expatistan'
    ),
    'cost of living in Philadelphia' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20in%20philadelphia',
        caller    => 'DDG::Spice::Expatistan',
    ),
	'cost of living madrid vs barcelona' => test_spice(
		'/js/spice/expatistan/cost%20of%20living%20madrid%20vs%20barcelona',
        caller    => 'DDG::Spice::Expatistan',
    ),
);

done_testing;

