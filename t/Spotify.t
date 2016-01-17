#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::Spotify)],
    DDG::Request->new(
        query_raw => "spotify madonna",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/spotify/madonna/de',
        call_type => 'include',
        caller => 'DDG::Spice::Spotify',
    ),
    'spotify madonna' => test_spice(
        '/js/spice/spotify/madonna/US',
        call_type => 'include',
        caller => 'DDG::Spice::Spotify'
    ),
    'madonna spotify' => test_spice(
        '/js/spice/spotify/madonna/US',
        call_type => 'include',
        caller => 'DDG::Spice::Spotify'
    ),
    'spotify.com' => undef,
    'spotify' => undef
);

done_testing;