#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;
use DateTime;
use DateTime::TimeZone;

my $loc  = test_location("de");
my $t = DateTime->now;
$t->set_time_zone($loc->time_zone);
my $day = $t->mday;
my $month = $t->month_name;
my $query = $day."_".$month;

my $req  = DDG::Request->new( 
    query_raw => "today in history", 
    location => $loc 
);

ddg_spice_test(
    ["DDG::Spice::TodayInHistory"],
    $req,
    test_spice(
        "/js/spice/today_in_history/$query",
        caller => "DDG::Spice::TodayInHistory",
    ),
    'this day in history' => test_spice(
        "/js/spice/today_in_history/$query",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
);

done_testing;
