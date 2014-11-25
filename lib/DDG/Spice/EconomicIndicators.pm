package DDG::Spice::EconomicIndicators;
# ABSTRACT: 
# Instant answer for economic indicators for different countries
# The indicators considered are
#   a) Gross Domestic Product
#   b) Annual Growth Rate
#   c) Per Capita Income
# All data used in this instant answer comes form World Bank(http://data.worldbank.org)

use DDG::Spice;
use Time::Piece;
use JSON;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "EconomicIndicators";
source "http://data.worldbank.org";
description "Gives information about economic indicators of a country( Gross Domestic Product, Per Capita Income, Growth Rate)";
primary_example_queries "gdp of india", "china per capita income","india growth rate";
category "finance";
topics "economy_and_finance";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/EconomicIndicators.pm";
attribution github => ["gauravtiwari5050", "Gaurav Tiwari"];

# Triggers
triggers any => "gdp", "gross domestic product","growth rate","per capita income";

#the world bank api requires date range in years
#we will use the current year, and three previous years
spice to => 'http://api.worldbank.org/countries/$1?per_page=10&date='.localtime->add_years(-3)->year.':'.localtime->year.'&format=json';


spice wrap_jsonp_callback => 1;

#read the mapping of country names to country codes from country_codes.json
my $country_codes = share('country_codes.json')->slurp;
$country_codes = decode_json($country_codes);

#data_sources.json contains details about api endpoints for different economic indicators
my $data_sources = share('data_sources.json')->slurp;
$data_sources = decode_json($data_sources);

# define aliases for some countries to improve hit rate
my $alias_lookup = share('country_aliases.json')->slurp;
$alias_lookup = decode_json($alias_lookup);


# Handle statement
handle query_clean => sub {


	my $data_source_id = ""; #holds the data source id (gdp or per_capita_income or growth_rate or something else)
    my $data_source; #holds the data source read from file data_sources.json

    #select the data_source based on the type of economic inicator requested in the query
    if (/gdp/ or /gross domestic product/) {
      $data_source_id = 'gdp';
    } elsif (/growth rate/) {
      $data_source_id = 'growth_rate';
    } elsif (/per capita income/){
      $data_source_id = 'per_capita_income';
    }

    #load the data source from data_sources.json
    $data_source = $data_sources->{$data_source_id};
    return unless $data_source_id and $data_source;

    #get the indicator id
    #Example indicator_id NY.GDP.MKTP.CD - for Gross Domestic Product
    my $indicator_id = $data_source->{'indicator_id'};
    return unless $indicator_id;

    # delete noise from query string
    s/(gdp|gross domestic product|growth rate|per capita income|what|is the|for|of)//g;
    # delete the whitespace left from query noise (spaces between words)
    s/^\s*|\s*$//g;
    # only the name of the country should be left in the string at this point
    my $country_key = $alias_lookup->{$_} || $_;

	#get the country code
	my $country_code = $country_codes->{$country_key};

    # return if the string is not one of the countries
    return unless $country_code;
    
    #return placeholder for the api
    return $country_code."/indicators/".$indicator_id;

    
};

1;
