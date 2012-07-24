#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Rhymes )],
    'what rhymes with duck' => test_spice(
        '/js/spice/rhymes/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
);

done_testing;

