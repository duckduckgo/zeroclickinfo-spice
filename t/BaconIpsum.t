#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::BaconIpsum)],
    # can't predict, output is Random
    'example query' => test_spice(
        '/js/spice/bacon_ipsum/query',
        call_type => 'include',
        caller => 'DDG::Spice:BaconIpsum'
    ),
    'bad example query' => undef,
);

done_testing;

