package DDG::Spice::FedoraProjectPackageDB;    ## no critic qw(Modules::RequireVersionVar)

# ABSTRACT: Show a summary of the searched Fedora project yum packages.

use DDG::Spice;

name 'FedoraProjectPackageDB';
source 'Fedora projects package database';
icon_url 'http://fedoraproject.org/favicon.ico';
description 'Display information about yum packages, matched search request';
primary_example_queries 'yum m*',                'centos package mc';
secondary_example_queries 'fedora package gcc*', 'htop redhat package';
category 'software';
topics 'sysadmin';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/FedoraProjectPackageDB.pm';
attribution
  github  => [ 'https://github.com/zdm', 'zdm' ],
  twitter => q{};

# Triggers
triggers startend => 'yum', 'yum package', 'redhat package', 'fedora package', 'centos package';

spice is_cached           => 1;
spice to                  => 'https://admin.fedoraproject.org/pkgdb/api/packages/?pattern=$1&limit=30';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder_lc => sub {
    return unless $_;

    return if $_ !~ /\A[\w*\-]+\z/smi;    # limit possible query reminder to single word with following additional special chars allowed: -*

    return $_;
};

1;
