#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Quixey)],
    'flight search app' => test_spice(
        '/js/spice/quixey/flight%20search/%5B2004%2C2008%2C2005%2C8556073%2C2015%5D/999999/2414062669',
        call_type => 'include',
        caller => 'DDG::Spice::Quixey'
    ),
    'android calculator app' => test_spice(
        '/js/spice/quixey/calculator/%5B2005%5D/999999/75675980',
        call_type => 'include',
        caller => 'DDG::Spice::Quixey'
    ),
    'ios flight tracker' => test_spice(
        '/js/spice/quixey/flight%20tracker/%5B2004%5D/999999/78989893',
        call_type => 'include',
        caller => 'DDG::Spice::Quixey'
    ),
);

done_testing;