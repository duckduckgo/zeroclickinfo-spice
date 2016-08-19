package DDG::Spice::SkyscannerFlightSearch;

# ABSTRACT: This IA will call Skyscanner's API to retrieve the cheapest flight prices to 
# different countries from the user's country

use DDG::Spice;
use strict;
use warnings;
use JSON;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)
spice from => '([^/]*)/([^/]*)/([^/]*)';
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/$1/$3/$2/$1/anywhere/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';
spice alt_to => {
    skyscanner_images => {
        to => 'https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=$1&enhancers=images&apikey={{ENV{DDG_SPICE_SKYSCANNER_IMAGES_APIKEY}}}'
    }
};

triggers startend => 'skyscanner';

# Load the list of currencies for each market
my $data = share('currencyCountryMapping.json')->slurp;
my $currencies = decode_json($data);

# Handle statement
handle remainder => sub {
    # ensuring there is no remainder, meaning the query is identical the trigger phrase
    # return if $_;
    
    # get user's location for the market if available (airline and travel agent prices depend on the market)
    my $market = $loc->country_code;
    # get language locale (replace '_' with '-' for compatibility) 
    my $locale = $lang->locale;
    $locale =~ tr/_/-/;
    # get currency from the json file using the market
    my $currency = $currencies->{$market};
    
    # if no market, locale or currency, default to US, en-US and USD
    if ($market eq "") {
        $market = "US";
    }
    if ($locale eq "") {
        $locale = "en-US";
    }
    if ($currency eq "") {
        $currency = "USD";
    }
    
    return $market, $locale, $currency;
    return;
};

1;
