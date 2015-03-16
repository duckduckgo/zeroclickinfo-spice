#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %queries = (
    'nwk' => 'jsq',
    'harrison' => 'wtc',
    'jsq' => 'hoboken',
    'grove st' => '33rd'
);

my %tests = map {(
    "next train from $_ to $queries{$_}" => test_spice(
        '/js/spice/transit/path/'
        . (join '-', map { lc } split /\s+/, $_)
        . '/'
        . (join '-', map { lc } split /\s+/, $queries{$_}),
        call_type => 'include',
        caller => 'DDG::Spice::Transit::PATH'
    ),
    "next train to $_ from $queries{$_}" => test_spice(
        '/js/spice/transit/path/'
        . (join '-', map { lc } split /\s+/, $queries{$_})
        . '/'
        . (join '-', map { lc } split /\s+/, $_),
        call_type => 'include',
        caller => 'DDG::Spice::Transit::PATH'
    ),
    "path $_ to $queries{$_}" => test_spice(
        '/js/spice/transit/path/'
        . (join '-', map { lc } split /\s+/, $_)
        . '/'
        . (join '-', map { lc } split /\s+/, $queries{$_}),
        call_type => 'include',
        caller => 'DDG::Spice::Transit::PATH'
    )
)} keys %queries;

ddg_spice_test(
    [qw( DDG::Spice::Transit::PATH )],
    (
        %tests,
        'next train from a station that doesnt exist to another' => undef,
        'path jsq to blah station' => undef,
        'path rail map' => undef
    )
);

done_testing;