#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Imdb )],
    'what imdb with duck' => test_spice(
        '/js/spice/imdb/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Imdb'
    ),
);

done_testing;

