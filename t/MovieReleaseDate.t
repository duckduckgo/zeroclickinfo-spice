#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MovieReleaseDate )],
    'air date thor 2' => test_spice(
        '/js/spice/movie_release_date/thor%202',
        call_type => 'include',
        caller => 'DDG::Spice::MovieReleaseDate'
    ),
    'air date of spongebob movie' => test_spice(
        '/js/spice/movie_release_date/spongebob%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::MovieReleaseDate'
    ),
    'finding nemo release' => test_spice(
        '/js/spice/movie_release_date/finding%20nemo',
        call_type => 'include',
        caller => 'DDG::Spice::MovieReleaseDate'
    ),
);

done_testing;

