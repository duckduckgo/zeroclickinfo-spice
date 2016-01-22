package DDG::Spice::Crackhash;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict; 

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 0;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://api.md5crack.com/crack/ZFCQCcpS1kLgbCQZ/$1';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers any => 'Crackmyhash', 'Crackhash' , 'crack hash';

# Handle statement
handle remainder => sub {
   
    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
