#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Movie )],
    'what movie with duck' => test_spice(
        '/js/spice/movie/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Movie'
    ),
);

done_testing;

