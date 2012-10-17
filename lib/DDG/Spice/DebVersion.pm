# Get the version of a package in various debian repositories
package DDG::Spice::DebVersion;

use DDG::Spice;
use strict;
use warnings;

triggers any => "debian version","debian versions","deb ver";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://qa.debian.org/madison.php?package=$1&table=debian&a=&c=&s=&text=on#';

spice wrap_string_callback => 1;

handle query_lc => sub {
    if (/^\s*deb(ian| )\s*ver(sion| )s?\s*(\S+)\s*$/i) {
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
