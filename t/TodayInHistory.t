#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::TodayInHistory )],
    'today in history' => test_spice(
        '/js/spice/today_in_history/',
        call_type => 'include',
        caller => 'DDG::Spice::TodayInHistory',
        is_cached => 0
    ),
    'this day in history' => test_spice(
        '/js/spice/today_in_history/',
        call_type => 'include',
        caller => 'DDG::Spice::TodayInHistory',
        is_cached => 0
    ),
);

done_testing;

