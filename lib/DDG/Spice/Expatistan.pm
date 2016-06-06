package DDG::Spice::Expatistan;
# ABSTRACT: Compare cities based on cost of living

use strict;
use DDG::Spice;

triggers any => "cost of living";

spice to => 'https://www.expatistan.com/api/spice?q=$1&api_key={{ENV{DDG_SPICE_EXPATISTAN_APIKEY}}}';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
