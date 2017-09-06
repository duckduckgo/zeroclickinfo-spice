#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::crackhash)],
    'Crackhash' => test_spice(
        '/js/spice/crackhash/query',
        call_type => 'include',
        caller => 'DDG::Spice::Crackhash'
    ),
    'bad example query' => undef,
);

done_testing;

