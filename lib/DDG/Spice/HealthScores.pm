package DDG::Spice::HealthScores;
# ABSTRACT: Returns restaurant health score information from the 
#           Eaternet/Swiftype API.

use strict;
use DDG::Spice;

triggers startend => 'health score', 'health scores';
spice to => 'http://api.swiftype.com/api/v1/public/engines/search.json?q=$1&engine_key={{ENV{DDG_SPICE_HEALTHSCORES_APIKEY}}}&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
