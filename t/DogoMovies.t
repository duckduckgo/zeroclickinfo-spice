#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoMovies )],
    'dogomovies' => test_spice(
        '/js/spice/dogo_movies/popular',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'dogo movies' => test_spice(
        '/js/spice/dogo_movies/popular',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'kids movies' => test_spice(
        '/js/spice/dogo_movies/kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids movie' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'hunger games movie kids review' => test_spice(
        '/js/spice/dogo_movies/hunger%20games%20kids%20review',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen film' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen films' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen dvd' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen dvds' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen trailer' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen trailers' => test_spice(
        '/js/spice/dogo_movies/frozen',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    )
);

done_testing;

