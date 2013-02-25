#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Quixey)],
    'flight search app' => test_spice(
        '/js/spice/quixey/flight%20search/%5B2004%2C2008%2C8556073%2C2005%2C2015%5D/',
        call_type => 'include',
        caller => 'DDG::Spice::Quixey'
    ),
    'android calculator app' => test_spice(
        '/js/spice/quixey/calculator/%5B2005%5D/75675980',
        call_type => 'include',
        caller => 'DDG::Spice::Quixey'
    ),
);

done_testing;
