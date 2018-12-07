#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Movie )],
    'rotten mighty ducks' => test_spice(
        '/js/spice/movie/mighty%20ducks',
        call_type => 'include',
        caller => 'DDG::Spice::Movie'
    ),
    'asus rt-66nu' => undef,
    'the graduate rotten' => test_spice(
        '/js/spice/movie/the%20graduate',
        caller    => 'DDG::Spice::Movie',
    ),
    'rotten tomatoes jiro dreams of sushi' => test_spice(
        '/js/spice/movie/jiro%20dreams%20of%20sushi',
        caller    => 'DDG::Spice::Movie',
    ),
    'indie game rotten tomatoes' => test_spice(
        '/js/spice/movie/indie%20game',
        caller    => 'DDG::Spice::Movie',
    ),
    'cast three idiots' => test_spice(
        '/js/spice/movie/three%20idiots',
        caller    => 'DDG::Spice::Movie',
    ),
    'cast of avatar' => test_spice(
        '/js/spice/movie/avatar',
        caller    => 'DDG::Spice::Movie',
    ),
    'kung fu panda cast' => test_spice(
        '/js/spice/movie/kung%20fu%20panda',
        caller    => 'DDG::Spice::Movie',
    ),
    'casts three idiots' => test_spice(
        '/js/spice/movie/three%20idiots',
        caller    => 'DDG::Spice::Movie',
    ),
    'casts of avatar' => test_spice(
        '/js/spice/movie/avatar',
        caller    => 'DDG::Spice::Movie',
    ),
    'kung fu panda casts' => test_spice(
        '/js/spice/movie/kung%20fu%20panda',
        caller    => 'DDG::Spice::Movie',
    ),
    'who stars in divergent' => test_spice(
        '/js/spice/movie/divergent',
        caller    => 'DDG::Spice::Movie',
    ),
    'who starred in insurgent' => test_spice(
        '/js/spice/movie/insurgent',
        caller    => 'DDG::Spice::Movie',
    ),
    'actor in independence day' => test_spice(
        '/js/spice/movie/independence%20day',
        caller    => 'DDG::Spice::Movie',
    ),
    'actors in independence day' => test_spice(
        '/js/spice/movie/independence%20day',
        caller    => 'DDG::Spice::Movie',
    ),
    'actress in deadpool' => test_spice(
        '/js/spice/movie/deadpool',
        caller    => 'DDG::Spice::Movie',
    ),
    'actresses in deadpool' => test_spice(
        '/js/spice/movie/deadpool',
        caller    => 'DDG::Spice::Movie',
    ),
    'the nice guys actor' => test_spice(
        '/js/spice/movie/the%20nice%20guys',
        caller    => 'DDG::Spice::Movie',
    ),
    'the nice guys actors' => test_spice(
        '/js/spice/movie/the%20nice%20guys',
        caller    => 'DDG::Spice::Movie',
    ),
    'the revenant actress' => test_spice(
        '/js/spice/movie/the%20revenant',
        caller    => 'DDG::Spice::Movie',
    ),
    'the revenant actresses' => test_spice(
        '/js/spice/movie/the%20revenant',
        caller    => 'DDG::Spice::Movie',
    ),
    'dark knight movie cast' => test_spice(
        '/js/spice/movie/dark%20knight',
        caller    => 'DDG::Spice::Movie',
    ),
    'dark knight movie casts' => test_spice(
        '/js/spice/movie/dark%20knight',
        caller    => 'DDG::Spice::Movie',
    ),
);

alt_to_test('DDG::Spice::Movie', ['movie_image']);

done_testing;

