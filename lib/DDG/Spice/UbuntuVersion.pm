# Get the version of a package in various debian repositories
package DDG::Spice::UbuntuVersion;

use DDG::Spice;
use strict;
use warnings;

triggers any => "ubuntu version","ubuntu versions", "ubuntu ver";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://qa.debian.org/madison.php?package=$1&table=ubuntu&a=&c=&s=&text=on#';

spice wrap_string_callback => 1;

handle query_lc => sub {
    if (/^\s*ubuntu\s*ver(sion| )s?\s*(\S+)\s*$/i) {
	print "\n\n\n$2\n\n\n";
        my $UbuntuPackage = $2;
        $UbuntuPackage =~ s/\s+$//g;
        $UbuntuPackage =~ s/^\s+//g;
        $UbuntuPackage =~ s/\s+/-/g;
	
	return $UbuntuPackage;

    }
    return;
};

1;
