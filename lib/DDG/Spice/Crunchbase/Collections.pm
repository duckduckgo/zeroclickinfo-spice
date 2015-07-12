package DDG::Spice::Crunchbase::Collections;
# Queries the Crunchbase organizations API on crunchbase trigger
use DDG::Spice;

# Metadata
primary_example_queries "crunchbase duckduckgo", "crunchbase uber";
description "Search the Crunchbase database for organizations, people, and products";
name "Crunchbase";
source "http://www.crunchbase.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Crunchbase/Collections.pm";
icon_url "https://www.crunchbase.com/favicon.ico";
category "reference";
topics "economy_and_finance";

# Attribution 
attribution github => ["https://github.com/rubinovitz", "rubinovitz"],
            twitter => ["https://twitter.com/rubinovitz", "rubinovitz"];

# Triggers
triggers startend => 'crunchbase';
spice to => 'https://api.crunchbase.com/v/3/organizations?user_key={{ENV{DDG_SPICE_CRUNCHBASE_APIKEY}}}&name=$1';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return $_ if $_;
    return;    
};

1;
