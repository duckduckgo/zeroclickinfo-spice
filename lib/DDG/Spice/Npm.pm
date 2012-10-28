package DDG::Spice::Npm;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

spice to => 'http://registry.npmjs.org/$1/latest';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

triggers start => 'npm';

handle remainder => sub {
	return $_ if $_;
	return;
};

1;