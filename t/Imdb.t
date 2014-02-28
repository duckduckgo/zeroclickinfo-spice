#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Imdb )],
    'imdb mighty ducks' => test_spice(
        '/js/spice/imdb/mighty%20ducks',
        call_type => 'include',
        caller => 'DDG::Spice::Imdb'
    ),
    'IMDb shawshank redemption' => test_spice(
        '/js/spice/imdb/shawshank%20redemption',
        caller    => 'DDG::Spice::Imdb',
    ),
);

done_testing;

