#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoMovies )],
    'dogomovies' => test_spice(
        '/js/spice/dogo_movies/dogomovies',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'dogo movies' => test_spice(
        '/js/spice/dogo_movies/dogo%20movies',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'kids movies' => test_spice(
        '/js/spice/dogo_movies/kids%20movies',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids movie' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'hunger games movie kids review' => test_spice(
        '/js/spice/dogo_movies/hunger%20games%20movie%20kids%20review',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids film' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20film',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids films' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20films',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids dvd' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20dvd',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids dvds' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20dvds',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids trailer' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20trailer',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'frozen kids trailers' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20trailers',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    )
);

done_testing;

