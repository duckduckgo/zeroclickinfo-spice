package DDG::Spice::QuoteOfTheDay;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://quotes.rest/qod.json';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers start => 'quote of the day','quote for the day';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return if $_;
};

1;
