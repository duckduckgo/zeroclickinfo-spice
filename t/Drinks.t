#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Drinks )],
    'how to make a white russian' => test_spice(
        '/js/spice/drinks/white%20russian',
        caller => 'DDG::Spice::Drinks'
    ),
);

done_testing;

