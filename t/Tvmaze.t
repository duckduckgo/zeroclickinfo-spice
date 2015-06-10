#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

my $show = test_spice(
    '/js/spice/tvmaze/show/game%20of%20thrones',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Show'
);

my $nextepisode = test_spice(
    '/js/spice/tvmaze/nextepisode/game%20of%20thrones',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Nextepisode'
);

my $previousepisode = test_spice(
    '/js/spice/tvmaze/previousepisode/game%20of%20thrones',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Previousepisode'
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Show)],

    # core queries
    'game of thrones tv'            => $show,
    'game of thrones tv show'       => $show,
    'game of thrones show'          => $show,
    'game of thrones tv series'     => $show,
    'game of thrones series'        => $show,

    'tv show game of thrones'       => $show,
    'tv game of thrones'            => $show,
    'tv series game of thrones'     => $show,
    'series game of thrones'        => $show,

    # non matches
    'show game of thrones'  => undef,

    'tv show'               => undef,
    'tv'                    => undef,
    'show'                  => undef,
    'tv series'             => undef,
    'series'                => undef
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Nextepisode)],

    # core queries
    'game of thrones next episode'          => $nextepisode,
    'game of thrones next airdate'          => $nextepisode,
    'game of thrones upcoming episode'      => $nextepisode,
    'next episode game of thrones'          => $nextepisode,
    'next airdate game of thrones'          => $nextepisode,
    'next episode for game of thrones'      => $nextepisode,
    'upcoming episode game of thrones'      => $nextepisode,
    'next game of thrones episode'          => $nextepisode,
    'upcoming game of thrones episode'      => $nextepisode,

    # with extra text
    'when is the next game of thrones episode?'         => $nextepisode,
    'when does the next game of thrones episode air'    => $nextepisode,
    'when is the next episode for game of thrones'      => $nextepisode,
    'what is the next airdate from game of thrones'     => $nextepisode,

    # non matches
    'game of thrones'               => undef,
    'episode'                       => undef,
    'airdate'                       => undef,
    'next airdate'                  => undef,
    'next episode'                  => undef,
    'episode next'                  => undef,
    'upcoming episode'              => undef,
    'episode upcoming'              => undef,
    'episode in game of thrones'    => undef,
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Previousepisode)],

    # core queries
    'game of thrones previous episode'      => $previousepisode,
    'game of thrones last episode'          => $previousepisode,
    'game of thrones latest episode'        => $previousepisode,
    'game of thrones previous airdate'      => $previousepisode,
    'previous episode game of thrones'      => $previousepisode,
    'previous airdate game of thrones'      => $previousepisode,
    'previous episode for game of thrones'  => $previousepisode,
    'last episode game of thrones'          => $previousepisode,
    'last game of thrones episode'          => $previousepisode,
    'latest game of thrones episode'        => $previousepisode,
    'recent game of thrones episode'        => $previousepisode,

    # with extra text
    'when was the last game of thrones episode?'        => $previousepisode,
    'when did the previous game of thrones episode air' => $previousepisode,
    'when was the latest episode for game of thrones'   => $previousepisode,
    'what is the last airdate from game of thrones'     => $previousepisode,
    'what is the most recent game of thrones episode'   => $previousepisode,

    # non matches
    'game of thrones'               => undef,
    'episode'                       => undef,
    'airdate'                       => undef,
    'previous airdate'              => undef,
    'previous episode'              => undef,
    'episode previous'              => undef,
    'last episode'                  => undef,
    'latest episode'                => undef,
    'recent episode'                => undef,
    'episode latest'                => undef,
    'episode in game of thrones'    => undef,
);

done_testing;

