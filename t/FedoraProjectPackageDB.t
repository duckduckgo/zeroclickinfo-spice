#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my $caller   = 'DDG::Spice::FedoraProjectPackageDB';
my @triggers = qw(yum redhat fedora centos);
my $call     = '/js/spice/fedora_project_package_db/';

ddg_spice_test(
    [$caller],
    create_tests('mc'),
);

sub create_tests {
    my @queries = @_;

    my @tests;

    for my $query (@queries) {
        for my $trigger (@triggers) {
            push @tests, "$trigger $query" => test_spice( $call . $query, caller => $caller, call_type => 'include' );
        }
    }

    return @tests;
}

done_testing;
