package DDG::Spice::Npm;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

primary_example_queries "npm underscore";
description "Shows an NPM package";
name "NPM";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Npm.pm";
icon_url "/i/npmjs.org.ico";
topics "sysadmin", "programming";
category "programming";
attribution github  => ['https://github.com/remixz', 'remixz'],
            twitter => ['https://twitter.com/zachbruggeman', 'zachbruggeman'];

triggers startend => 'npm';

spice to => 'http://registry.npmjs.org/$1/latest';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;
