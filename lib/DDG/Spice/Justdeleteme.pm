package DDG::Spice::Justdeleteme;

# ABSTRACT: Search JusteDelte.Me for the provider

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://raw.githubusercontent.com/rmlewisuk/justdelete.me/master/sites.json';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => "justdelete", 
                  "delete account", "delete account on", "delete my", "delete my account", "delete my account on", 
                  "cancel account", "cancel account on", "cancel my", "cancel my account", "cancel my account on", 
                  "remove account", "remove account on", "remove my", "remove my account", "remove my account on"; 

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return $_;
};

1;
