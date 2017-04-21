package DDG::Spice::Mo;

# ABSTRACT: This just creates the carder for Mo's learning modes :)

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# Using the endpoint for learning searches
# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://learn-with-mo.herokuapp.com/duckduckgo?query=$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'learn', 'learn more', 'learn about', 'learn more about';

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return $_ if $_;
    return;
};

1;
