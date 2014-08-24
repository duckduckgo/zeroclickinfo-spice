#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %queries = (
    'villanova' => 'paoli',
    'university city' => '49th st'
);

ddg_spice_test(
    [qw( DDG::Spice::SEPTA )],
    (map {(
        "next train from $_ to $queries{$_}" => test_spice(
            '/js/spice/septa/'
            . (join '%20', map { ucfirst } split /\s+/, $_)
            . '/'
            . (join '%20', map { ucfirst } split /\s+/, $queries{$_}),
            call_type => 'include',
            caller => 'DDG::Spice::SEPTA'
        ),
        "next train to $_ from $queries{$_}" => test_spice(
            '/js/spice/septa/'
            . (join '%20', map { ucfirst } split /\s+/, $queries{$_})
            . '/'
            . (join '%20', map { ucfirst } split /\s+/, $_),
            call_type => 'include',
            caller => 'DDG::Spice::SEPTA'
        ),
    )} keys %queries),
    'next train from west trenton to market east station' => test_spice(
        '/js/spice/septa/West%20Trenton/Market%20East',     #"station" should be removed
        call_type => 'include',
        caller => 'DDG::Spice::SEPTA'
    ),
);

done_testing;

