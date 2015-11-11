package DDG::Spice::<: $ia_package_name :>;

# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'http://example.com/search/$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'triggerWord', 'trigger phrase';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
