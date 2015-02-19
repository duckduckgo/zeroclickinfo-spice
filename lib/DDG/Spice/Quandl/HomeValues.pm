package DDG::Spice::Quandl::HomeValues;

use DDG::Spice;
use Text::Trim;

# meta data
# Initially this is will work with zip codes, but will expand
# to other region identifiers
# 
primary_example_queries "27514 home values";
secondary_example_queries "one bedroom houses 27514";
description "Home values for a given region";
name "Home Values";
code_url "https://github.com/brianrisk/zeroclickinfo-spice";
icon_url "https://www.quandl.com/favicon.ico";
topics "economy_and_finance";
category "finance";
attribution web => ["https://www.quandl.com", "Quandl"],
            twitter => "quandl";
            
# load our trigger phrases
my @trigger_lines = share('home_values_triggers.txt')->slurp;
# hash to associate phrases with URL codes
my %trigger_phrases = ();
# array to preserve the order of the trigger phrases from the text file
my @trigger_keys;
foreach my $line (@trigger_lines) {
    # remove return char
    chomp $line;
    #only add if has value and is not a comment
    if (length $line > 0) {
        # split by tab
        my @chunks = split /\t/, $line;
        # add to our hash
        $trigger_phrases{$chunks[0]} = $chunks[1];
        # add to our array
        push @trigger_keys, $chunks[0];
    }
}

# defining our triggers
triggers any => @trigger_keys;

# to set an environmental variable:
# duckpan env set <name> <value>

# set spice parameters
spice to => 'http://quandl.com/api/v1/datasets/ZILLOW/$1.json?auth_token={{ENV{DDG_SPICE_QUANDL_APIKEY}}}&rows=2';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {

    # split query phrase by spaces
    my @words = split / /, $_;
    
    # go through each word of the query to see if it is a valid region
    # for now, a region will only be a zip code
    my $region;
    my $indicator_type;
    foreach my $word (@words) {
        # save region and exit loop if found
        if (length $word == 5) {
            if ($word =~ "\\d+") {
                $region = $word;
                $indicator_type = "ZIP";
                last;
            }
        }
    };
    
    # only return if we found a region in the search query
    my $query = lc $_;
    if ($region) {
        # iterate through trigger phrases in their file-order
        for my $trigger (@trigger_keys) {
            # return if the trigger phrase is in the query
            if ( $query =~ /$trigger/ ) {
                return $indicator_type . "_" . $trigger_phrases{$trigger} . "_" . $region;
            }
        };
    }
    
    return;
};

1;



