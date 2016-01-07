package DDG::Spice::FedoraProjectPackageDB;
# ABSTRACT: Show a summary of the searched Fedora project yum packages.

use strict;
use DDG::Spice;

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
