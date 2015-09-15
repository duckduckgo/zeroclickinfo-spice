#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Lastfm::Artist'
    ],
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

    # have to implement the front-end method for these to work
    # needed method - ddg_spice_lastfm_artist_similar
    'bands similar to incubus' => undef,
    'similar artists ben folds' => undef,
    '30 seconds to mars similar bands' => undef,

    'watch band' => undef,
    'apple watch bands' => undef,
    'android wear watch bands' => undef,
);

done_testing;
