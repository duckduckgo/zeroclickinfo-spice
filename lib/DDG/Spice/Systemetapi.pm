package DDG::Spice::Systemetapi;

# ABSTRACT: DuckDuckGo Instant Answer for the Swedish Systembolaget catalogue of alcohol.

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
#spice to => 'http://systemetapi.se/product?name=$1&callback={{callback}}';
spice to => 'http://systemetapi.se/product?name=$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => "bolaget", "systemet", "systembolaget";

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    
    return $_ if $_;
    return;
};

1;

