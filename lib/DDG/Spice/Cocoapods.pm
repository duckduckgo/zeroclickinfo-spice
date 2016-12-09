package DDG::Spice::Cocoapods;

use DDG::Spice;

spice is_cached => 1;

triggers startend => 'cocoapods';

spice to => 'http://search.cocoapods.org/api/v1/pods.flat.hash.json?query=$1';
spice wrap_jsonp_callback => 1;
spice headers => { Referer => '' };

handle remainder => sub {
	return lc $_ if $_;
	return;
};


1;
