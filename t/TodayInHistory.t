#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::TodayInHistory )],
    'today in history' => test_spice(
        '/js/spice/today_in_history/',
        caller => 'DDG::Spice::TodayInHistory',
    ),
    'this day in history' => test_spice(
        '/js/spice/today_in_history/',
        caller => 'DDG::Spice::TodayInHistory',
    ),
);

done_testing;

