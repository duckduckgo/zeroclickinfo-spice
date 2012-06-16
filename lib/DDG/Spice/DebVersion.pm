package DDG::Spice::DebVersion;

use DDG::Spice;

triggers any => "debian version";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://qa.debian.org/madison.php?package=$1&table=all&a=&c=&s=&text=on#';


handle query_lc => sub {
    if (/^debian version (\S*)$/i) {
        my $DebPackage = $1;
        $DebPackage =~ s/\s+$//g;
        $DebPackage =~ s/^\s+//g;
        $DebPackage =~ s/\s+/-/g;
	
	return $DebPackage;

    }
    return;
};

1;
