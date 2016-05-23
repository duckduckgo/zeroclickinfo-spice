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
);

alt_to_test('DDG::Spice::Movie', ['movie_image']);

done_testing;

