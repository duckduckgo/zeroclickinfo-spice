package DDG::Spice::MagicTheGathering;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development
use strict;
use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://api.deckbrew.com/mtg/cards?name=$1';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers startend => 'magic card', 'mtg', 'magic', 'magic: the gathering', 'magic the gathering';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return $_ unless !$_;
    return;
};

1;
