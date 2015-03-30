#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use URI::Escape;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;
use utf8;

my $loc = test_location('de');

ddg_spice_test(
    ['DDG::Spice::Forecast'],
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
        query_raw => '天気',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => '天气',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => '날씨',
        location => $loc
    ) => test_spice(
        "/js/spice/forecast/" . uri_escape_utf8(${\$loc->loc_str}) . "/current",
        call_type => 'include',
        caller => 'DDG::Spice::Forecast',
        is_cached => 0
    ),
    'temperature stockholm' => undef,
    'shipping forecast' => undef,
    'weather forecast bbc' => undef,
    'bbc weather forecast' => undef,
    '"location" forecast' => undef,
    'financial forecast' => undef,
    'market forecast' => undef,
    'gold forecast' => undef,
    'nba forecast' => undef,
    'soccer game weather' => undef,
    'weather underground.com' => undef,
    'color temperature' => undef,
    'ising model critical temperature' => undef,
    'weather map' => undef,
    'weather maps' => undef,
    'weather app' => undef,
    'weather apps' => undef,
    'temperature conversion chart' => undef,
    'temperature pork done'        => undef,
    'temperature iron melts'       => undef,

# Disabling since I made the trigger a startend. (caine)
#    'Philadelphia weather this week' => test_spice(
#    	'/js/spice/forecast/philadelphia',
#    	call_type => 'include',
#    	caller => 'DDG::Spice::Forecast',
#        is_cached => 1
#    ),
#    'what is the weather in new york' => test_spice(
#    	'/js/spice/forecast/new%20york',
#    	call_type => 'include',
#    	caller => 'DDG::Spice::Forecast',
#        is_cached => 1
#    ),
);

done_testing;
