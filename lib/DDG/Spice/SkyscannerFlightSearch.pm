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
spice from => '([^/]*)/([^/]*)/([^/]*)/([^/]*)/([^/]*)';
spice to => 'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/$1/$3/$2/$4/$5/anytime/anytime?apikey={{ENV{DDG_SPICE_SKYSCANNER_APIKEY}}}';
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

# Load the list of countries and their ISO code
my $cities_raw = share('cities.json')->slurp;
my $cities = decode_json($cities_raw);

sub get_origin_and_destination {

}


sub get_place_code {
    my ($param) = @_;
    @_ = "FR";
    return @_;
}

# Handle statement
handle remainder => sub {
    my $market = "";
    my $locale = "";
    my $currency = "";
    my $origin = "";
    my $destination = "";
    my $word = "";
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
    
    # query must be in the form 
    # [from][origin][to][destination]
    # or [origin][to][destination]
    # or [from][origin]
    # or [destination]
    # 
    my @query = split(/\s+to\s+/, $_);
    # strip 'fligh(s) from' to allow more flexible queries and remove left space
    $query[0] =~ s/\b(flight(?:s)?|from)\b//g;
    $query[0] =~ s/^\s+//;
    print "\n**** Number of terms: " . scalar(@query) . "*****";
    print "\n" . $query[0];
    print "\n" . $query[1];
    print "\n*********";

    if ($query[0] eq "") {
        # determine destination (use lowercase) and use user's country as origin
        $origin = $market;
        $word = lc($query[1]);
        if (exists $countries->{$word}) {
            $destination = $countries->{$word};
        } elsif (exists $cities->{$word}) {
            $destination = $cities->{$word};
        } else {
            $destination = "anywhere";
        }
    } else {
        # determine origin and destination (use lowercase)
        $origin = lc($query[0]);
        $destination = lc($query[1]);
        
        if (exists $countries->{$origin}) {
            $origin = $countries->{$origin};
        } elsif (exists $cities->{$origin}) {
            $origin = $cities->{$origin};
        } else {
            $origin = $market;
        }
        
        if (exists $countries->{$destination}) {
            $destination = $countries->{$destination};
        } elsif (exists $cities->{$destination}) {
            $destination = $cities->{$destination};
        } else {
            $destination = "anywhere";
        }
    }

    # if no market, locale or currency, default to US, en-US and USD
    if ($market eq "") {
        $market = "US";
    }
    if ($locale eq "") {
        $locale = "en-US";
    }
    
    if ($destination eq "") {
        $destination = "anywhere";
    }
    
    return $market, $locale, $currency, $origin, $destination;
    return;
};

1;
