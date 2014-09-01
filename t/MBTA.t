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
    "next train from King Street Station" => undef    #station doesn't exist
);

done_testing;
