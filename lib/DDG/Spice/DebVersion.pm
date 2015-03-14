# Get the version of a package in various debian repositories
package DDG::Spice::DebVersion;

use DDG::Spice;

triggers any => "debian version", "debian versions", "deb ver", "debian ver";

# spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://sources.debian.net/api/src/$1/';

spice wrap_string_callback => 1;

handle query_lc => sub {
    if (/^\s*deb(ian| )\s*ver(sion| )\s*([\w\.\-\ ]+)\s*$/i) {
        print "\n\n\n$1\n\n\n";
        my $DebPackage = $3;
        $DebPackage =~ s/\s+$//g;
        $DebPackage =~ s/^\s+//g;
        $DebPackage =~ s/\s+/-/g;

	    return $DebPackage;

    }
    return;
};

1;
