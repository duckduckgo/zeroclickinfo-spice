#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoMovies )],
    'frozen kids movie' => test_spice(
        '/js/spice/dogo_movies/frozen%20kids%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    ),
    'hunger games movie kids review' => test_spice(
        '/js/spice/dogo_movies/hunger%20games%20movie%20kids%20review',
        call_type => 'include',
        caller => 'DDG::Spice::DogoMovies'
    )
);

done_testing;

