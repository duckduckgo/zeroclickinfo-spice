package DDG::Spice::DebVersion;
# ABSTRACT: Get the version numbers for debian packages

use Text::Trim;
use DDG::Spice;

name "Debian Versions";
source "Debian Sources";
icon_url "https://sources.debian.net/static/favicon.ico";
description "Get the version of a package in various debian repositories";
primary_example_queries "debian version emacs24", "ruby debian versions";
secondary_example_queries "deb ver emacs24";
category "software";
topics "computing", "sysadmin", "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DebVersion.pm";

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
