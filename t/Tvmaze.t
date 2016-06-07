#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

my $show = test_spice(
    '/js/spice/tvmaze/show/mr.%20robot',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Show'
);

my $nextepisode = test_spice(
    '/js/spice/tvmaze/nextepisode/mr.%20robot',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Nextepisode'
);

my $previousepisode = test_spice(
    '/js/spice/tvmaze/previousepisode/mr.%20robot',
    call_type => 'include',
    caller => 'DDG::Spice::Tvmaze::Previousepisode'
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Show)],

    # core queries
    'mr. robot tv'            => $show,
    'mr. robot tv show'       => $show,
    'mr. robot show'          => $show,
    'mr. robot tv series'     => $show,
    'mr. robot series'        => $show,

    'tv show mr. robot'       => $show,
    'tv mr. robot'            => $show,
    'tv series mr. robot'     => $show,
    'series mr. robot'        => $show,
    
    # non matches
    'show mr. robot'  => undef,
    'tv show'               => undef,
    'tv'                    => undef,
    'show'                  => undef,
    'tv series'             => undef,
    'series'                => undef
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Nextepisode)],

    # core queries
    'mr. robot next episode'              => $nextepisode,
    'mr. robot next airdate'              => $nextepisode,
    'mr. robot upcoming episode'          => $nextepisode,
    'next episode mr. robot'              => $nextepisode,
    'next airdate mr. robot'              => $nextepisode,
    'next episode for mr. robot'          => $nextepisode,
    'upcoming episode mr. robot'          => $nextepisode,
    'next mr. robot episode'              => $nextepisode,
    'upcoming mr. robot episode'          => $nextepisode,
    'when does mr. robot come back'       => $nextepisode,
    'when does mr. robot come out',       => $nextepisode,
    'when does mr. robot return',         => $nextepisode,
    'when does mr. robot air',            => $nextepisode,
    'when does mr. robot start',          => $nextepisode,
    'when does mr. robot season 2 start'  => $nextepisode,

    # with extra text
    'when is the next mr. robot episode?'         => $nextepisode,
    'when does the next mr. robot episode air'    => $nextepisode,
    'when is the next episode for mr. robot'      => $nextepisode,
    'what is the next airdate from mr. robot'     => $nextepisode,
    'when does mr. robot season 2 start?'         => $nextepisode,
    'when does mr. robot come back on'            => $nextepisode,

    # non matches
    'mr. robot'                     => undef,
    'episode'                       => undef,
    'airdate'                       => undef,
    'next airdate'                  => undef,
    'next episode'                  => undef,
    'episode next'                  => undef,
    'upcoming episode'              => undef,
    'episode upcoming'              => undef,
    'episode in mr. robot'          => undef,
    'mr. robot come out'            => undef,
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Previousepisode)],

    # core queries
    'mr. robot previous episode'      => $previousepisode,
    'mr. robot last episode'          => $previousepisode,
    'mr. robot latest episode'        => $previousepisode,
    'mr. robot previous airdate'      => $previousepisode,
    'previous episode mr. robot'      => $previousepisode,
    'previous airdate mr. robot'      => $previousepisode,
    'previous episode for mr. robot'  => $previousepisode,
    'last episode mr. robot'          => $previousepisode,
    'last mr. robot episode'          => $previousepisode,
    'latest mr. robot episode'        => $previousepisode,
    'recent mr. robot episode'        => $previousepisode,

    # with extra text
    'when was the last mr. robot episode?'        => $previousepisode,
    'when did the previous mr. robot episode air' => $previousepisode,
    'when was the latest episode for mr. robot'   => $previousepisode,
    'what is the last airdate from mr. robot'     => $previousepisode,
    'what is the most recent mr. robot episode'   => $previousepisode,

    # non matches
    'mr. robot'                     => undef,
    'episode'                       => undef,
    'airdate'                       => undef,
    'previous airdate'              => undef,
    'previous episode'              => undef,
    'episode previous'              => undef,
    'last episode'                  => undef,
    'latest episode'                => undef,
    'recent episode'                => undef,
    'episode latest'                => undef,
    'episode in mr. robot'          => undef,
);

done_testing;

