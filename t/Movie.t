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
);

done_testing;

