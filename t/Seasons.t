#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

my $tmp;
my $year;

($tmp, $tmp, $tmp, $tmp, $tmp, $year, $tmp, $tmp, $tmp) = localtime(time);
$year += 1900;

ddg_spice_test(
    [ 'DDG::Spice::Seasons' ],

    DDG::Request->new(
        query_raw => "vernal equinox 2016",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/seasons/2016/de/spring',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    DDG::Request->new(
        query_raw => "vernal solstice 2011",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/us/spring',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    DDG::Request->new(
        query_raw => "first day of fall",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/' . $year . '/us/autumn',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    "summer solstice" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    "2017 summer solstice" => test_spice(
        '/js/spice/seasons/2017/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    "summer equinox" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons'
    ),

    "first day" => undef,

    "solstice and equinox" => undef,

    "start solstice" => undef,

);

done_testing;
