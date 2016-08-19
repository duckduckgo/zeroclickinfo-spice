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
spice from => '([^/]*)/([^/]*)/([^/]*)/([^/]*)';
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/$1/$3/$2/$1/$4/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';
spice alt_to => {
    skyscanner_images => {
        to => 'https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=$1&enhancers=images&apikey={{ENV{DDG_SPICE_SKYSCANNER_IMAGES_APIKEY}}}'
    }
};

triggers startend => 'skyscanner';

# Load the list of currencies for each market
my $data = share('currencyCountryMapping.json')->slurp;
my $currencies = decode_json($data);

# Load the list of countries and their ISO code
my $countries_raw = share('countryIsoCodes.json')->slurp;
my $countries = decode_json($countries_raw);

# Handle statement
handle remainder => sub {
    # ensuring there is no remainder, meaning the query is identical the trigger phrase
    # return if $_;
    # 
    my $market = "";
    my $locale = "";
    my $currency = "";
    
    # get user's location for the market if available (airline and travel agent prices depend on the market)
    $market = $loc->country_code;
    # get language locale (replace '_' with '-' for compatibility) 
    $locale = $lang->locale;
    $locale =~ tr/_/-/;
    
    # get currency from the json file using the market
    if (exists $currencies->{$market}) {
        $currency = $currencies->{$market};
    } else {
        $currency = "USD";
    }
    # determine destination (use lowercase)
    my $word = lc($_);
    my $destination = "";
    if (exists $countries->{$word}) {
        $destination = $countries->{$word};
    } else {
        $destination = "anywhere";
    }
    # if no market, locale or currency, default to US, en-US and USD
    if ($market eq "") {
        $market = "US";
    }
    if ($locale eq "") {
        $locale = "en-US";
    }
    
    return $market, $locale, $currency, $destination;
    return;
};

1;
