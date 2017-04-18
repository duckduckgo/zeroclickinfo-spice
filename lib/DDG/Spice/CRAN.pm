package DDG::Spice::CRAN;

# ABSTRACT: Search for information about R packages in the CRAN repository (using METACRAN's CRAN database)

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://crandb.r-pkg.org/$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => 'cran', 'r package', 'metacran', 'r';

# Handle statement
handle remainder => sub {
    return $_ if $_;
    return;
};

1;
