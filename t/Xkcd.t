#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Xkcd )],
    'xkcd' => test_spice(
        '/js/spice/xkcd/',
        call_type => 'include',
        caller => 'DDG::Spice::Xkcd',
        is_cached => 0
    ),
    '619 xkcd' => test_spice(
        '/js/spice/xkcd/619',
        call_type => 'include',
        caller => 'DDG::Spice::Xkcd',
        is_cached => 0
    ),
);

done_testing;

