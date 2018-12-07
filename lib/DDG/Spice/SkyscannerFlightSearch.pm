package DDG::Spice::SkyscannerFlightSearch;

# ABSTRACT: This IA will call Skyscanner's API to retrieve the cheapest flight prices to 
# different countries from the user's country

use DDG::Spice;
use strict;
use warnings;
use JSON::MaybeXS

# No caching of results
spice is_cached => 0;

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice from => '([^/]*)/([^/]*)/([^/]*)/([^/]*)/([^/]*)';
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/$1/$3/$2/$4/$5/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';
spice alt_to => {
    skyscanner_images => {
        to => 'https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=$1&enhancers=images&apikey={{ENV{DDG_SPICE_SKYSCANNER_IMAGES_APIKEY}}}'
    }
};

spice headers => { Accept => 'application/json' };

triggers startend => 'skyscanner';

# Load the list of currencies for each market
my $currencies_raw = share('currencyCountryMapping.json')->slurp;
my $currencies = decode_json($currencies_raw);

# Load the list of countries and their ISO code
my $countries_raw = share('countryCodes.json')->slurp;
my $countries = decode_json($countries_raw);

# Load the list of cities and their Skyscanner code (using Skyscanner code as IATA code is ambiguous in certain cases such as Berlin where the city 
# and one of the airports have the same code)
my $cities_raw = share('cityCodes.json')->slurp;
my $cities = decode_json($cities_raw);

# Handle statement
handle remainder => sub {
    my $origin = "";
    my $destination = "";
    
    # get user's location for the market if available (airline and travel agent prices depend on the market), if none default to 'US' 
    my $market = $loc->country_code // "US";
        
    # get language locale (replace DDG's '_' with '-' for Skyscanner compatibility), if none default to 'en-US'
    my $locale = $lang->locale // "en-US";
    
    $locale =~ tr/_/-/;
    if ($locale eq "") {
        $locale = "en-US";
    }   
    
    # get currency from the json file using the market, if none default to USD
    my $currency = $currencies->{$market} // "USD";
    
    if (index($_, 'to') != -1) {
        my @query = split(/\s+to\s+/, $_);
        $origin = $query[0];
        $destination = $query[1];
    } else {
        $origin = $_;
    }
    # strip 'flight(s) from' to allow more flexible queries and remove left trailing space
    $origin =~ s/\b(flight(?:s)?|from)\b//g;
    $origin =~ s/^\s+//;
    #print "\n\n**** User query *****";
    #print "\nOrigin: " . $origin;
    #print "\nDestination: " . $destination;
    #print "\n*********************\n\n";

    # determine origin country or city (use lowercase), if no match use user's country
    $origin = $countries->{lc($origin)} // $cities->{lc($origin)} // $market;
    
    # determine destination country or city (use lowercase), if no match use 'anywhere'
    $destination = $countries->{lc($destination)} // $cities->{lc($destination)} // "anywhere";

    return $market, $locale, $currency, $origin, $destination;
};

1;
