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
    'cost of living Madrid' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20madrid',
        call_type => 'include',
        caller => 'DDG::Spice::Expatistan'
    ),
    'cost of living in san diego' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20in%20san%20diego',
        call_type => 'include',
        caller => 'DDG::Spice::Expatistan'
    ),
    'cost of living madrid, Spain' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20madrid%2C%20spain',
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
    'cost of living comparison london vs paris' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20comparison%20london%20vs%20paris',
        caller    => 'DDG::Spice::Expatistan',
    ),
    'cost of living difference london paris' => test_spice(
        '/js/spice/expatistan/cost%20of%20living%20difference%20london%20paris',
        caller    => 'DDG::Spice::Expatistan',
    ),
    'compare cost of living between london and paris' => test_spice(
        '/js/spice/expatistan/compare%20cost%20of%20living%20between%20london%20and%20paris',
        caller    => 'DDG::Spice::Expatistan',
    ),

);

done_testing;

