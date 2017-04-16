#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Beer)],
    'beer leffe dark' => test_spice(
        '/js/spice/beer/leffe%20dark',
        caller => 'DDG::Spice::Beer'
    ),
);

done_testing;
