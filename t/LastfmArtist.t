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
    'DJ Khaled' => test_spice(
        '/js/spice/lastfm/artist/dj%20khaled/all',
        call_type => 'include',
        caller => 'DDG::Spice::Lastfm::Artist',
    ),
    'musicians Pink Floyd' => test_spice(
        '/js/spice/lastfm/artist/pink%20floyd/all',
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
