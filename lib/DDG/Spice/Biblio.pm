package DDG::Spice::Biblio;
# ABSTRACT: Search for used and rare books on Biblio.com 
use DDG::Spice;
use strict;
use warnings;
# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically
spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'http://www.biblio.com/app/api/product_search?X-API-KEY=jTHlt3EyyeYHvOYfdHZv0n62djuHdfoCcUY4VH04&include_urls=true&sort=relevance&photo=1&fulltext=$1';
# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers startend => "biblio", "book", "used book";

# Handle statement
handle remainder => sub {

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    # return \$_;
    return $_ if $_;
    return;
};

1;
