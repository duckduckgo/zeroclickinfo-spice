#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Lastfm::Artist'
    ],
    'bands similar to incubus' => test_spice(
        '/js/spice/lastfm/artist/incubus/similar',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),
    'similar artists ben folds' => test_spice(
        '/js/spice/lastfm/artist/ben%20folds/similar',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),
    '30 seconds to mars similar bands' => test_spice(
        '/js/spice/lastfm/artist/30%20seconds%20to%20mars/similar',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),
    'weezer band' => test_spice(
        '/js/spice/lastfm/artist/weezer/all',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),
    'artist kanye west' => test_spice(
        '/js/spice/lastfm/artist/kanye%20west/all',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),

    'watch band' => undef,
    'apple watch bands' => undef,
    'android wear watch bands' => undef,
);

done_testing;
