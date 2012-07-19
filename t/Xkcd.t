#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Xkcd )],
    'what xkcd with duck' => test_spice(
        '/js/spice/xkcd/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Xkcd'
    ),
);

done_testing;

