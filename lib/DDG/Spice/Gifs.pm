package DDG::Spice::Gifs;
# ABSTRACT: Search for gifs

use strict;
use DDG::Spice;
use Text::Trim;

triggers startend => "giphy", "giphy";

spice to => 'http://api.giphy.com/v1/gifs/search?q=$1&api_key={{ENV{DDG_SPICE_GIPHY_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    s/\bgifs?\b//;
    trim;
    return $_ if $_;
    return;
};

1;
