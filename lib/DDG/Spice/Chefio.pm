package DDG::Spice::Chefio;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

primary_example_queries "cookbook underscore";
description "Shows an NPM package";
name "test";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Npm.pm";
topics "sysadmin", "programming";
category "programming";
attribution github  => ['https://github.com/remixz', 'zachbruggeman'],
            twitter => ['https://twitter.com/zachbruggeman', 'zachbruggeman'];

triggers startend => 'cookbook';

spice to => 'https://supermarket.chef.io/api/v1/search?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;
