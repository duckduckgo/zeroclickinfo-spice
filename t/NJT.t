#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %queries = (
    'secaucus' => 'new york penn',
    'SUMMIT' => 'BRICK CHURCH',
    'ny penn' => 'metropark',
    'montclair state' => 'denville'
);

my %tests = map {(
    "next train from $_ to $queries{$_}" => test_spice(
        '/js/spice/transit/njt/'
        . (join '-', map { lc } split /\s+/, $_)
        . '/'
        . (join '-', map { lc } split /\s+/, $queries{$_}),
        call_type => 'include',
        caller => 'DDG::Spice::Transit::NJT'
    ),
    "next train to $_ from $queries{$_}" => test_spice(
        '/js/spice/transit/njt/'
        . (join '-', map { lc } split /\s+/, $queries{$_})
        . '/'
        . (join '-', map { lc } split /\s+/, $_),
        call_type => 'include',
        caller => 'DDG::Spice::Transit::NJT'
    ),
)} keys %queries;

ddg_spice_test(
    [qw( DDG::Spice::Transit::NJT )],
    (
        %tests,
        'next train from a station that doesnt exist to another' => undef,
        'njt secaucus to blah station' => undef,
        'njt rail map' => undef
    )
);

done_testing;
