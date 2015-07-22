#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::Meetup)],

    DDG::Request->new(
        query_raw => 'meetup groups in Phoenixville',
        location => test_location('us'),
    ) => test_spice(
        "/js/spice/meetup/Phoenixville/US/PA",
        call_type => 'include',
        caller => 'DDG::Spice::Meetup',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => 'meetup groups near me',
        location => test_location('us'),
    ) => test_spice(
        "/js/spice/meetup/Phoenixville/US/PA",
        call_type => 'include',
        caller => 'DDG::Spice::Meetup',
        is_cached => 0
    ),

    'meet group' => undef,
    'meetups about cats' => undef,
    'meetups for kids' => undef,
);

done_testing;
