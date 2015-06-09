#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use POSIX qw(strftime);

my $y = strftime "%Y", localtime;

ddg_spice_test(
    [qw(DDG::Spice::Holiday)],
    'when is christmas' => test_spice(
        "/js/spice/holiday/United%20States/christmas/$y",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter in austria' => test_spice(
        "/js/spice/holiday/austria/easter/$y",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is presidents day in us' => test_spice(
        "/js/spice/holiday/us/presidents%20day/$y",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is christmas 2016' => test_spice(
        '/js/spice/holiday/United%20States/christmas/2016',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter 2017' => test_spice(
        '/js/spice/holiday/United%20States/easter/2017',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    # user has to provide the whole year
    'when is easter 17' => test_spice(
        '/js/spice/holiday/United%20States/easter/2015',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    )
);

done_testing;
