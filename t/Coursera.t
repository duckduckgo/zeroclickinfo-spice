#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Coursera)],

    'coursera cryptography' => test_spice(
        '/js/spice/coursera/cryptography',
        call_type => 'include',
        caller => 'DDG::Spice::Coursera'
    ),
    'bad example query' => undef,
);

done_testing;

