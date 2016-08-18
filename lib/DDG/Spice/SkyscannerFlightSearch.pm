package DDG::Spice::SkyscannerFlightSearch;

# ABSTRACT: This IA will call Skyscanner's API to retrieve the cheapest flight prices to 
# different countries from the user's country

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/$1/anywhere/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';
spice alt_to => {
    skyscanner_images => {
        to => 'https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=$1&enhancers=images&apikey={{ENV{DDG_SPICE_SKYSCANNER_IMAGES_APIKEY}}}'
    }
};

triggers startend => 'skyscanner';

# Handle statement
handle remainder => sub {
    # ensuring there is no remainder, meaning the query is identical the trigger phrase
    return if $_;
    # get user's location for default origin
    my $location = $loc->country_code;
    return $location if $location;
    return;
};

1;
