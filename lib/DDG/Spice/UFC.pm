package DDG::Spice::UFC;
# ABSTRACT: Displays current Ultimate Fighting Championship fighters

use strict;
use DDG::Spice;

triggers startend => 'ufc fighters';

spice to => 'http://ufc-data-api.ufc.com/api/v3/iphone/fighters';
spice wrap_jsonp_callback => 1; 

handle remainder => sub {
    return $_;
};
1;
