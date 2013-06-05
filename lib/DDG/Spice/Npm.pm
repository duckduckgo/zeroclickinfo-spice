package DDG::Spice::Npm;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

primary_example_queries "npm underscore";
description "Shows an NPM package";
name "Npm";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Npm.pm";
icon_url "/i/npmjs.org.ico";
topics "sysadmin", "programming";
category "programming";
attribution github  => ['https://github.com/remixz', 'remixz'],
            twitter => ['https://twitter.com/zachbruggeman', 'zachbruggeman'];

spice to => 'http://registry.npmjs.org/$1/latest';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

triggers startend => 'npm';

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
