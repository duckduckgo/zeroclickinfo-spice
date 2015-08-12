#!/usr/bin/env perl

use strict;
use warnings;

use DateTime;
use Date::Parse;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;

spice is_cached => 1;

my $loc  = test_location("us");
my $latitude = $loc->latitude;
my $longitude = $loc->longitude;
my $timezone = $loc->time_zone;
my $datetime = DateTime->now;
$datetime->set_time_zone($timezone);
my $timestamp = str2time($datetime);
my $query = $timestamp . '/' . $latitude . '/' . $longitude . '/America%2FNew_York';

ddg_spice_test(
    [qw( DDG::Spice::IslamicPrayerTimes)],
    'namaz times' => test_spice(
        "/js/spice/islamic_prayer_times/$query",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'islamic prayer times' => test_spice(
        "/js/spice/islamic_prayer_times/$query",
        call_type => 'include',
        caller => 'DDG::Spice::IslamicPrayerTimes'
    ),
    'fethiye islamic prayer times' => undef,
    'namaz times in istanbul' => undef,
    'islamic prayer times canakkale' => undef
);

done_testing;

