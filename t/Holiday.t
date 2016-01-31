#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use POSIX qw(strftime);

ddg_spice_test(
    [qw(DDG::Spice::Holiday)],
    'when is christmas' => test_spice(
        "/js/spice/holiday/United%20States/christmas/%20",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is pi day' => test_spice(
        "/js/spice/holiday/United%20States/pi%20day/%20",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'what day is christmas' => test_spice(
        "/js/spice/holiday/United%20States/christmas/%20",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter in austria' => test_spice(
        "/js/spice/holiday/austria/easter/%20",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is presidents day in us' => test_spice(
        "/js/spice/holiday/United%20States/presidents%20day/%20",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is dussehra in india' => test_spice(
        "/js/spice/holiday/india/dussehra/%20",
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
    # can query past events
    'when was easter' => test_spice(
        '/js/spice/holiday/United%20States/easter/2016',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    # user has to provide the whole year
    'when is easter 17' => test_spice(
        '/js/spice/holiday/United%20States/easter/%20',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is father\'s day 2015 in the usa' => test_spice(
        '/js/spice/holiday/United%20States/father%27s%20day/2015',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is father\'s day 2015 in the us' => test_spice(
        '/js/spice/holiday/United%20States/father%27s%20day/2015',
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),

    'when is day' => undef,
    'when is a day' => undef
);

done_testing;
