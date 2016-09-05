#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

sub build_test {
    my ($date) = @_;
    test_spice(
        "/js/spice/daily_holidays/$date",
        call_type => 'include',
        caller => 'DDG::Spice::DailyHolidays'
    );
}

ddg_spice_test(
    [qw( DDG::Spice::DailyHolidays)],
    'holidays today' => build_test('today');
);

done_testing;

