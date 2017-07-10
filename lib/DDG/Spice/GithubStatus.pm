package DDG::Spice::GithubStatus;
# ABSTRACT: Search for the current status of GitHub.

use strict;
use DDG::Spice;
use Text::Trim;

triggers start => "github status", "github system status";

handle remainder => sub {
    return if $_; #
    return '';
};

spice to => 'https://status.github.com/api/last-message.json?callback={{callback}}';
spice proxy_cache_valid => "418 1d";


handle query_lc => sub {
    return $_ if m/^github$/; # return if only github
    s/^github//g; # strip trigger
    $_ = trim($_); # trim
    return $_ if m/^(system)?\s*status$/i; # match (system) status
    return;
};

1;
