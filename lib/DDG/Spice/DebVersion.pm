# Get the version of a package in various debian repositories
package DDG::Spice::DebVersion;

use DDG::Spice;

triggers any => "debian version", "debian versions", "deb ver", "debian ver";

# spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://sources.debian.net/api/src/$1/';

spice wrap_string_callback => 1;

handle remainder => sub {
    my $DebPackage = lc $_;
    $DebPackage =~ s/\s+$//g;
    $DebPackage =~ s/^\s+//g;
    $DebPackage =~ s/\s+/-/g;
    return $DebPackage;
};

1;
