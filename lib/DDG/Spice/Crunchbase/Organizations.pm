package DDG::Spice::Crunchbase::Organizations;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

use strict;

# Triggers
triggers startend => '///***never trigger***///';
spice to => 'https://api.crunchbase.com/v/2/organization/$1?user_key={{ENV{DDG_SPICE_CRUNCHBASE_APIKEY}}}';

# Handle statement
handle query_lc => sub {

    return $_ if $_;
    return;    
};

1;
