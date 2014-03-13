#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Movie )],
    'movie mighty ducks' => test_spice(
        '/js/spice/movie/mighty%20ducks',
        call_type => 'include',
        caller => 'DDG::Spice::Movie'
    ),
    'asus rt-66nu' => undef,
    'the graduate movie' => test_spice(
        '/js/spice/movie/the%20graduate',
        caller    => 'DDG::Spice::Movie',
    ),
    'jiro dreams of sushi rating' => test_spice(
        '/js/spice/movie/jiro%20dreams%20of%20sushi',
        caller    => 'DDG::Spice::Movie',
    ),
    'indie game film' => test_spice(
        '/js/spice/movie/indie%20game',
        caller    => 'DDG::Spice::Movie',
    ),
);

done_testing;

