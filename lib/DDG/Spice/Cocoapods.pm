package DDG::Spice::Cocoapods;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Cocoapods";
source "https://cocoapods.org";
icon_url "/favicons/favicon.ico";
description "Search Pod Info from Cocoapods";
primary_example_queries "cocoapods AFNetworking", "cocoapods SVProgressHUD";
secondary_example_queries "cocoapods AFNetworking for ios";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "programming";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "computing", "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Cocoapods.pm";
attribution github => ["https://github.com/soleo", "Xinjiang Shao"],
            twitter => ['https://twitter.com/soleoshao', 'Xinjiang Shao'];

# Triggers
#triggers any => "cocoapods", "trigger phrase";
triggers startend => 'cocoapods';

spice to => 'http://search.cocoapods.org/api/v1/pods.flat.hash.json?query=$1';
spice wrap_jsonp_callback => 1;
# Handle statement
handle remainder => sub {
	return lc $_ if $_;
	return;
};


1;
