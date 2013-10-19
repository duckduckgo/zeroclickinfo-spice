#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MovieReleaseDate )],
    'air date thor' => test_spice(
        '/js/spice/movie_release_date/zeroclickinfo',
        call_type => 'include',
        caller => 'DDG::Spice::MovieReleaseDate'
    ),
    'finding nemo release' => test_spice(
        '/js/spice/movie_release_date/zeroclickinfo',
        call_type => 'include',
        caller => 'DDG::Spice::MovieReleaseDate'
    ),
);

done_testing;

