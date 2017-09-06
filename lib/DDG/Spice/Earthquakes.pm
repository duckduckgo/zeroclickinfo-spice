package DDG::Spice::Earthquakes;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 5m'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'earthquake', 'earthquakes';

# Handle statement
handle query_lc => sub {
    return $_;
};

1;
