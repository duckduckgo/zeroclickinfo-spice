package DDG::Spice::Newint;
# ABSTRACT: Returns a list of New Internationalist magazines.

use strict;
use DDG::Spice;

triggers startend => "newint", "new internationalist magazine", "new internationalist";

spice to => 'https://digital.newint.com.au/issues.json?utf8=✓&query=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return lc $_;
};

1;
