package DDG::Spice::DebVersion;

use DDG::Spice;

triggers any => "debian version";

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://qa.debian.org/madison.php?package=$1&table=debian&a=&c=&s=&text=on#';

zci is_cached => 1;

spice wrap_string_callback => 1;

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
