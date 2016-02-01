#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;
use DateTime;
use DateTime::TimeZone;

my $loc  = test_location("us");
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
    'historical events on june 22' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on june 22nd' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on june 22nd 2015' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on 22 june' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on June 22, 2000' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on Jun 22' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on 22/06/2015' => test_spice(
        "/js/spice/today_in_history/22_June",
        caller    => 'DDG::Spice::TodayInHistory',
    ),
    'historical events on word' => undef,
    'historical events on 22'   => undef,
    'historical events on june' => undef,
    'historical events on 2014' => undef,
);

done_testing;
