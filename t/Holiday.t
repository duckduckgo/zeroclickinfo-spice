#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use POSIX qw(strftime);

my $currentYear = (localtime(time))[5] + 1900;

ddg_spice_test(
    [qw(DDG::Spice::Holiday)],
    'when is christmas day' => test_spice(
        "/js/spice/holiday/United%20States/christmas%20day/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'what day is christmas day' => test_spice(
        "/js/spice/holiday/United%20States/christmas%20day/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter day in austria' => test_spice(
        "/js/spice/holiday/austria/easter%20day/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is dussehra in india' => test_spice(
        "/js/spice/holiday/india/dussehra/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is christmas day 2016' => test_spice(
        "/js/spice/holiday/United%20States/christmas%20day/2016/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is easter sunday 2017' => test_spice(
        "/js/spice/holiday/United%20States/easter%20sunday/2017/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is fathers day 2015 in the usa' => test_spice(
        "/js/spice/holiday/usa/fathers%20day/2015/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is fathers day 2015 in the us' => test_spice(
        "/js/spice/holiday/us/fathers%20day/2015/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is eid al-fitr 2017 in the uk' => test_spice(
        "/js/spice/holiday/uk/eid%20al%20fitr/2017/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is eid al fitr 2017 in the uk' => test_spice(
        "/js/spice/holiday/uk/eid%20al%20fitr/2017/1",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is st. patricks day' => test_spice(
        "/js/spice/holiday/United%20States/st%20patricks%20day/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),
    'when is st patricks day' => test_spice(
        "/js/spice/holiday/United%20States/st%20patricks%20day/$currentYear/0",
        call_type => 'include',
        caller => 'DDG::Spice::Holiday'
    ),

    # For some reason the API is picky about holiday names that end in a quote.
    #  ie: "presidents' day" returns a result whereas "presidents day" does not...
    #    'when is presidents day in us' => test_spice(
    #        "/js/spice/holiday/United%20States/presidents%20day/$currentYear/0",
    #        call_type => 'include',
    #        caller => 'DDG::Spice::Holiday'
    #    ),

    'when is day' => undef,
    'when is easter 17' => undef,
    'when is a day' => undef,
    'when is california primary' => undef,
    'when is the june primary' => undef
);

done_testing;
