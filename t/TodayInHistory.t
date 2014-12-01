#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::TodayInHistory)],

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
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

