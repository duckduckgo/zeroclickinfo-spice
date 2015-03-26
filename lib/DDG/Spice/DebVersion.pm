# Get the version of a package in various debian repositories
package DDG::Spice::DebVersion;

use Text::Trim;
use DDG::Spice;

triggers startend => "debian version", "debian versions", "deb ver", "debian ver";

# spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'http://sources.debian.net/api/src/$1/';

spice wrap_string_callback => 1;

handle remainder => sub {
    my $query = lc trim $_;
    $query =~ s/\b(for|in|at|on|all|latest|stable)\b//g;
    $query =~ s/\b(squeeze|wheezy|jessie|sid|experimental|\s)+\b//g;
    $query =~ /^(?:\s)*(?<package>[a-z0-9\-]+).*$/i;

    my $package = trim $+{package};
    return $package;
};

1;
