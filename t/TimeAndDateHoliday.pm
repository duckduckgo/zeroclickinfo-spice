#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::TimeAndDateHoliday)],
    'when is christmas' => test_spice(
        '/js/spice/time_and_date_holiday/United%20States/christmas',
        call_type => 'include',
        caller => 'DDG::Spice::TimeAndDateHoliday'
    ),
    'when is easter in austria' => test_spice(
        '/js/spice/time_and_date_holiday/austria/easter',
        call_type => 'include',
        caller => 'DDG::Spice::TimeAndDateHoliday'
    ),
    'when is presidents day in us' => test_spice(
        '/js/spice/time_and_date_holiday/us/presidents%20day',
        call_type => 'include',
        caller => 'DDG::Spice::TimeAndDateHoliday'
    ),
);

done_testing;
