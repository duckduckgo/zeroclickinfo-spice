#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my @queries = (
    'powermate',
    'fire extinguisher',
);

ddg_spice_test(
    [qw( DDG::Spice::Amazon )],
    map {(
        "amazon $_" => test_spice(
            '/js/spice/amazon/' . join('%20', split /\s+/, $_),
            call_type => 'include',
            caller => 'DDG::Spice::Amazon'
        ),
    )} @queries
);

done_testing;

