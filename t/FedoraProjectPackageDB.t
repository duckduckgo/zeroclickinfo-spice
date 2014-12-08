#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my $caller   = 'DDG::Spice::FedoraProjectPackageDB';
my @triggers = qw(yum redhat fedora centos);
my $call     = '/js/spice/fedora_project_package_db/';

ddg_spice_test(
    ['DDG::Spice::FedoraProjectPackageDB'],
    'yum mc'              => test_spice( '/js/spice/fedora_project_package_db/mc',   caller => 'DDG::Spice::FedoraProjectPackageDB', call_type => 'include', is_cached => 1 ),
    'redhat package mc'   => test_spice( '/js/spice/fedora_project_package_db/mc',   caller => 'DDG::Spice::FedoraProjectPackageDB', call_type => 'include', is_cached => 1 ),
    'mc fedora package'   => test_spice( '/js/spice/fedora_project_package_db/mc',   caller => 'DDG::Spice::FedoraProjectPackageDB', call_type => 'include', is_cached => 1 ),
    'centos package htop' => test_spice( '/js/spice/fedora_project_package_db/htop', caller => 'DDG::Spice::FedoraProjectPackageDB', call_type => 'include', is_cached => 1 ),
);

done_testing;
