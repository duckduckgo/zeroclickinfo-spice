package DDG::Spice::Cricket;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.series.ongoing&format=json&diagnostics=true&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback={{callback}}';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers query_lc => qr/cricket|ipl scores{0,1}|schedules{0,1}/;

# Handle statement
handle query_lc => sub {
        return $_;
    };

1;
