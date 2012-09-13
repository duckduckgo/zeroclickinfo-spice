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
        caller => 'DDG::Spice::Xkcd'
    ),
);

done_testing;

