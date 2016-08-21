package DDG::Spice::HamCallsigns;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
#spice to => 'http://example.com/search/$1';
spice to => 'http://data.fcc.gov/api/license-view/basicSearch/getLicenses?format=json&searchValue=$1&servicedesc=amateur';


# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => 'ham', 'ham lookup';

# Handle statement
handle remainder => sub {
    # check if the is in a US callsign format
    if ($req->query_clean =~ /\w{1,3}\d{1}\w{1,3}/) {
        return $_;
    } else {
	return;
    }
};

1;
