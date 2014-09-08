#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my %queries = (
    'villanova' => 'paoli',
    'university city' => '49th st',
);

my %tests = map {(
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
)} keys %queries;

ddg_spice_test(
    [qw( DDG::Spice::SEPTA )],
    (
        %tests,
        'septa thorndale to 30th' => test_spice(  #test station guessing
            '/js/spice/septa/Thorndale/30th%20Street%20Station',
            call_type => 'include',
            caller => 'DDG::Spice::SEPTA'
        ),
        'septa drexel to 49th street' => test_spice(
            '/js/spice/septa/University%20City/49th%20St',
            call_type => 'include',
            caller => 'DDG::Spice::SEPTA'
        ),
        'next train from a station that doesnt exist to another' => undef,
        'septa blahblah from villanova to paoli' => undef,
        'septa rail map' => undef
    )
);

done_testing;

