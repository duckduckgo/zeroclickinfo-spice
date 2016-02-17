package DDG::Spice::Justdeleteme;

# ABSTRACT: Search JusteDelte.Me for the provider

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 0;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://raw.githubusercontent.com/rmlewisuk/justdelete.me/master/sites.json';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => "justdelete";

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return $_;
};

1;
