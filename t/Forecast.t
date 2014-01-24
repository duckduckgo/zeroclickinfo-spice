#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use URI::Escape;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;

my $loc = test_location('de');

ddg_spice_test(
    ['DDG::Spice::Forecast'],
    DDG::Request->new(
        query_raw => 'weather forecast',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'forecast',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'weather',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'weather today',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'weather tomorrow',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'forecast today',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    'weather for Troy, NY' => test_spice(
    	'/js/spice/forecast/troy%2C%20ny',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'forecast for Troy, NY' => test_spice(
        '/js/spice/forecast/troy%2C%20ny',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'weather Troy, NY' => test_spice(
        '/js/spice/forecast/troy%2C%20ny',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'forecast Troy, NY' => test_spice(
        '/js/spice/forecast/troy%2C%20ny',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'Philadelphia weather' => test_spice(
    	'/js/spice/forecast/philadelphia',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'Philadelphia weather forecast' => test_spice(
    	'/js/spice/forecast/philadelphia',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'Philadelphia weather this week' => test_spice(
    	'/js/spice/forecast/philadelphia',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'what is the weather in new york' => test_spice(
    	'/js/spice/forecast/new%20york',
    	call_type => 'include',
    	caller => 'DDG::Spice::Forecast',
        is_cached => 1
    ),
    'forecast Philadelphia' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'forecast for Philadelphia' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'Philadelphia temp' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'temp Philadelphia' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'temperature Philadelphia' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'Philadelphia forecast' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    'Philadelphia forecast for today' => test_spice(
        '/js/spice/forecast/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Forecast', 
        is_cached => 1
    ),
    DDG::Request->new(
        query_raw => 'current temperature',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'current weather',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'current forecast',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'local forecast',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'local temperature',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'local weather',
        location => $loc
    ) => test_spice(
	"/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    'what is the current temperature in washington dc' => test_spice(
	'/js/spice/forecast/washington%20dc',
	call_type => 'include',
	caller => 'DDG::Spice::Forecast',
	is_cached => 1
    )
);

done_testing;
