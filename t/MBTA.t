#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Transit::MBTA )],
    "next train from Ashland" => test_spice(
        '/js/spice/transit/mbta/Ashland',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::MBTA'
    ),
    "train schedule from Brandeis" => test_spice(
        '/js/spice/transit/mbta/Brandeis%2F%20Roberts',     #expand an alias
        call_type => 'include',
        caller => 'DDG::Spice::Transit::MBTA'
    ),
    "outbound MBTA train from Worcester" => test_spice(     #strip outbound
        '/js/spice/transit/mbta/Worcester%20%2F%20Union%20Station',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::MBTA'
    ),
    "MBTA trains leaving from Plymouth" => test_spice(   #primary_example_query
        '/js/spice/transit/mbta/Plymouth',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::MBTA'
    ),
    "Next MBTA train from Forge Park" => test_spice(   #secondary_example_query
        '/js/spice/transit/mbta/Forge%20Park%20%2F%20495',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::MBTA'
    ),
    "next train from King Street Station" => undef    #station doesn't exist
);

done_testing;
