#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

use DDG::Spice::Seasons;

my $year = (localtime(time))[5] + 1900;
my $min_year = DDG::Spice::Seasons::API_EPOCH;
my $max_year = $year + DDG::Spice::Seasons::YEARS_INTO_FUTURE;

ddg_spice_test(
    [ 'DDG::Spice::Seasons' ],

    # Location

    DDG::Request->new(
        query_raw => "vernal equinox 2016",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/seasons/2016/de/spring',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    DDG::Request->new(
        query_raw => "vernal solstice 2011",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/us/spring',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    # Default current year

    DDG::Request->new(
        query_raw => "first day of fall",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/' . $year . '/us/autumn',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    # Different query styles

    "summer solstice" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    "2017 summer solstice" => test_spice(
        '/js/spice/seasons/2017/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    # Query case

    "summer equinox" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    "Summer equinox" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    # Limits

    ($min_year - 1) . " summer solstice" => undef,

    $min_year . " summer solstice" => test_spice(
        '/js/spice/seasons/' . $min_year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    $max_year . " summer solstice" => test_spice(
        '/js/spice/seasons/' . $max_year . '/us/summer',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 0
    ),

    ($max_year + 1) . " summer solstice" => undef,

    # Non-matching terms

    "first day" => undef,

    "solstice and equinox" => undef,

    "start solstice" => undef,

);

done_testing;
