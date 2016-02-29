#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::IslamicPrayerTimes)],
    DDG::Request->new(
        query_raw => "salat times",
        location => test_location("us")
    ) => test_spice(
        "/js/spice/islamic_prayer_times/Phoenixville%2CPennsylvania%2CUnited%20States",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'fethiye namaz times' => test_spice(
        "/js/spice/islamic_prayer_times/fethiye",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'salat times for dc' => test_spice(
        "/js/spice/islamic_prayer_times/dc",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'islamic prayer times in new york usa' => test_spice(
        "/js/spice/islamic_prayer_times/new%20york%20usa",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'prayer times' => undef,
    'namaz time' => undef
);

done_testing;

