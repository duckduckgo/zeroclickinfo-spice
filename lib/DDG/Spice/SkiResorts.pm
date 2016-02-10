package DDG::Spice::SkiResorts;

# ABSTRACT: Displays information on ski resorts

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://www.piste.io/dem/$1.geojson';

# Triggers - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#triggers
triggers any => 'la plagne', 'st anton', 'heavenly', 'chamonix';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return 'chimborazo';
};

1;
