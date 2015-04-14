#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::Holiday)],
    'when is christmas' => test_spice(
        '/js/spice/holiday/United%20States/christmas',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    # ignoring year
    'when is christmas 2016' => test_spice(
        '/js/spice/holiday/United%20States/christmas',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter in austria' => test_spice(
        '/js/spice/holiday/austria/easter',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is presidents day in us' => test_spice(
        '/js/spice/holiday/us/presidents%20day',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
);

done_testing;
