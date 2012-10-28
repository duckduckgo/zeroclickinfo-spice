package DDG::Spice::DebVersion;

use DDG::Spice;
use strict;
use warnings;

triggers any => "debian version","debian versions";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://qa.debian.org/madison.php?package=$1&table=debian&a=&c=&s=&text=on#';


spice wrap_string_callback => 1;

handle query_lc => sub {
    if (/^\s*debian\s*versions?\s*(\S+)\s*$/i) {
        my $DebPackage = $1;
        $DebPackage =~ s/\s+$//g;
        $DebPackage =~ s/^\s+//g;
        $DebPackage =~ s/\s+/-/g;
	
	return $DebPackage;

    }
    return;
};

1;
