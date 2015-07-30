package DDG::Spice::LaunchpadProject;
# ABSTRACT: Search for information about Launchpad projects

use strict;
use DDG::Spice;
use Text::Trim;

name "LaunchpadProject";
description "Searches Launchpad projects";
primary_example_queries "launchpad project bookworm", "lp project noise";
category "programming";
topics "programming", "web_design";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/LaunchpadProject.pm";
attribution github => ['https://github.com/Feral2k/','Logan Garcia'],
            email => ['logangarcia@fastmail.fm','Logan Garcia'];

spice to => 'https://api.launchpad.net/devel/projects?ws.op=search&text=$1&ws.size=30';
spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => '200 30d';

triggers startend => "launchpad project", "lp project";

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
