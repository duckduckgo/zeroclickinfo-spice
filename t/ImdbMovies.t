#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::ImdbMovies)],
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    #'bad example query' => undef,
    
    'imdb batman' => test_spice(
        '/js/spice/imdb_movies/batman',
        call_type => 'include',
        caller => 'DDG::Spice::ImdbMovies'
    ),
    'finding nemo ratings' => test_spice(
        '/js/spice/imdb_movies/finding%20nemo',
        call_type => 'include',
        caller => 'DDG::Spice::ImdbMovies'
    ),
    'finding dory film' => test_spice(
        '/js/spice/imdb_movies/finding%20dory',
        call_type => 'include',
        caller => 'DDG::Spice::ImdbMovies'
    ),
    'imdbbatman' => undef,
    'finding doryratings' => undef,
    'finding nemofilm' => undef,
);

done_testing;
