package DDG::Spice::GithubStatus;
# ABSTRACT: Search for the current status of GitHub.

use strict;
use DDG::Spice;
use Text::Trim;

primary_example_queries "github status";
description "Github status";
name "Github Status";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GithubStatus.pm";
topics "computing", "programming";
category "programming";
attribution github => ['https://github.com/Feral2k','Logan Garcia'],
            email => ['logangarcia@openmailbox.org','Logan Garcia'];

triggers startend => 'github';

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
