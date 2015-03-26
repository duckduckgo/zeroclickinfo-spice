# Get the version of a package in various debian repositories
package DDG::Spice::DebVersion;

use Text::Trim;
use DDG::Spice;

attribution github => ['https://github.com/iambibhas', 'Bibhas'],
            twitter => ['https://twitter.com/bibhasdn', 'Bibhas D'];

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
