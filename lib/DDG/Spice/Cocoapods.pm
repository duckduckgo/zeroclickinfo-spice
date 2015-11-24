package DDG::Spice::Cocoapods;

use DDG::Spice;

spice is_cached => 1;

name "Cocoapods";
source "https://cocoapods.org";
icon_url "https://cocoapods.org/favicons/favicon.ico";
description "Search Pod Info from Cocoapods";
primary_example_queries "cocoapods AFNetworking", "cocoapods SVProgressHUD";
secondary_example_queries "cocoapods AFNetworking for ios";

category "programming";

topics "computing", "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Cocoapods.pm";
attribution github => ["https://github.com/soleo", "Xinjiang Shao"],
            twitter => ['https://twitter.com/soleoshao', 'Xinjiang Shao'];

triggers startend => 'cocoapods';

spice to => 'http://search.cocoapods.org/api/v1/pods.flat.hash.json?query=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};


1;
