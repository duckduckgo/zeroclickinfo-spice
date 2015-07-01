package DDG::Spice::Crunchbase::Collections;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

#Attribution
primary_example_queries "crunchbase organization duckduckgo", "crunchbase people gabe weinberg", "crunchbase product duckduckgo";
description "Search the Crunchbase database for organizations, people, and products";
name "Crunchbase";
source "http://www.crunchbase.com";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Crunchbase/Collections.pm";
category "reference";
topics "economy_and_finance";
attribution github => ["https://github.com/rubinovitz", "rubinovitz"],
            twitter => ["https://twitter.com/rubinovitz", "rubinovitz"];

# Triggers
triggers startend => 'crunchbase';
spice to => 'http://api.crunchbase.com/v/2/organizations?user_key={{ENV{DDG_SPICE_CRUNCHBASE_APIKEY}}}&query=$1';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return $_ if $_;
    return;    
};

1;
