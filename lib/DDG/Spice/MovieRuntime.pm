package DDG::Spice::MovieRuntime;
# ABSTRACT: Search for movie runtime

use strict;
use DDG::Spice;

triggers startend => "movie runtime", "movie runnning time", "movie length";

spice to => 'http://www.omdbapi.com/?t=$1&plot=short&r=json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
