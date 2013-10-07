#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Imdb )],
    'imdb mighty ducks' => test_spice(
        '/js/spice/imdb/mighty%20ducks',
        caller => 'DDG::Spice::Imdb'
    ),
);

done_testing;

