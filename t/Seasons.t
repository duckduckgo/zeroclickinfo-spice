#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 0;

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
        '/js/spice/seasons/2016/de/spring/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    DDG::Request->new(
        query_raw => "vernal solstice 2011",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/us/spring/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    "summer solstice in canada" => test_spice(
        '/js/spice/seasons/' . $year . '/ca/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    "summer solstice in canada 2020" => test_spice(
        '/js/spice/seasons/2020/ca/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 1
    ),

    "summer solstice in united kingdom" => test_spice(
        '/js/spice/seasons/' . $year . '/gb/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    DDG::Request->new(
        query_raw => "vernal solstice 2011 in sweden",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/se/spring/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 1
    ),

    DDG::Request->new(
        query_raw => "first day of spring 2011 in sweden",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/se/spring/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 1
    ),

    DDG::Request->new(
        query_raw => "first day of spring in sweden 2011",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/se/spring/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
        is_cached => 1
    ),

    "summer solstice in " => undef,

    "summer solstice in blah" => undef,

    # Default current year

    DDG::Request->new(
        query_raw => "first day of fall",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/' . $year . '/us/autumn/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    # Different query styles

    "summer solstice" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    "2017 summer solstice" => test_spice(
        '/js/spice/seasons/2017/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    # Query case

    "summer equinox" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    "Summer equinox" => test_spice(
        '/js/spice/seasons/' . $year . '/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    # Limits

    ($min_year - 1) . " summer solstice" => undef,

    $min_year . " summer solstice" => test_spice(
        '/js/spice/seasons/' . $min_year . '/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    $max_year . " summer solstice" => test_spice(
        '/js/spice/seasons/' . $max_year . '/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    ($max_year + 1) . " summer solstice" => undef,

    # Northerh/Southern hemisphere

    DDG::Request->new(
        query_raw => "first day of summer 2011",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/seasons/2011/us/summer/north',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),


    DDG::Request->new(
        query_raw => "first day of summer 2011",
        location => test_location("au")
    ) => test_spice(
        '/js/spice/seasons/2011/au/summer/south',
        call_type => 'include',
        caller => 'DDG::Spice::Seasons',
    ),

    # Non-matching terms

    "first day" => undef,
    "solstice and equinox" => undef,
    "start solstice" => undef,
    "summer solistice in canada blah" => undef

);

done_testing;
