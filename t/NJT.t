#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %queries = (
    'secaucus' => 'new york penn',
    'atlantic city' => 'pennsauken',
);

ddg_spice_test(
    [qw( DDG::Spice::NJT )],
    map {(
        "next train from $_ to $queries{$_}" => test_spice(
            '/js/spice/njt/'
            . (join '-', map { lc } split /\s+/, $_)
            . '/'
            . (join '-', map { lc } split /\s+/, $queries{$_}),
            call_type => 'include',
            caller => 'DDG::Spice::NJT'
        ),
        "next train to $_ from $queries{$_}" => test_spice(
            '/js/spice/njt/'
            . (join '-', map { lc } split /\s+/, $queries{$_})
            . '/'
            . (join '-', map { lc } split /\s+/, $_),
            call_type => 'include',
            caller => 'DDG::Spice::NJT'
        ),
    )} keys %queries
);

done_testing;