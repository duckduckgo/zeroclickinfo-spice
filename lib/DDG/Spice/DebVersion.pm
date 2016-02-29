package DDG::Spice::DebVersion;
# ABSTRACT: Get the version numbers for debian packages

use Text::Trim;
use DDG::Spice;

triggers startend => "debian version", "debian versions", "deb ver", "debian ver";

spice to => 'https://sources.debian.net/api/src/$1/';

spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    my $query = $_;
    $query =~ s/\b(for|in|at|on|all|latest|stable)\b//g;
    $query =~ s/\b(squeeze|wheezy|jessie|sid|experimental|\s)+\b//g;
    $query =~ /^(?:\s)*(?<package>[a-z0-9\-]+).*$/i;

    my $package = trim $+{package};
    return $package;
};

1;
