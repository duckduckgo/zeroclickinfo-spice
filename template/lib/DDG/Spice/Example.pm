package DDG::Spice::<: $ia_package_name :>;

# ABSTRACT: Write an abstract here
# Start at http://docs.duckduckhack.com if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/backend-reference/api-reference.html
spice to => 'http://example.com/search/$1';

# Triggers - http://docs.duckduckhack.com/backend-reference/triggers-handle-functions.html
triggers any => 'triggerWord', 'trigger phrase';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
