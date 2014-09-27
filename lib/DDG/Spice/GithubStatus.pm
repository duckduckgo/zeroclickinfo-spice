package DDG::Spice::GithubStatus;
# ABSTRACT: Search for the current status of GitHub.

use DDG::Spice;

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


handle remainder => sub {
    return $_ if /^(system)?\s*status$/i;
    return;
};

1;
