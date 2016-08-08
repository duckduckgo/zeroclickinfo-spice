package DDG::Spice::SkyscannerFlightSearch;

# ABSTRACT: This IA will call Skyscanner's API to retrieve the cheapest flight prices to 
# the chosen destination

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/$1/anywhere/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
#triggers any => 'skyscanner flights to', 'skycanner show me flights to ', 'skyscanner inspire me';
triggers any => 'skyscanner', 'skycanner flights', 'skyscanner inspire me', 'skyscanner deals';

# Handle statement
handle remainder => sub {
    # get user's location for default origin
    my $location = $loc->country_code;
    return $location if $location;
    return;
    # return $_ if $_;
    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    #return "anywhere";
};

1;
