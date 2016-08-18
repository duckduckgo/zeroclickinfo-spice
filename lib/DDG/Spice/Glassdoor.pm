package DDG::Spice::Glassdoor;

# ABSTRACT: Anonymous employee reviews powered by glassdoor

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; 

spice wrap_jsonp_callback => 1; 

spice to => 'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p={{ENV{DDG_SPICE_GLASSDOOR_PARTNERID}}}&t.k={{ENV{DDG_SPICE_GLASSDOOR_APIKEY}}}&action=employers&q=$1&userip=0.0.0.0&useragent=Mozilla/%2F4.0'; #https://hn.algolia.com/api/v1/search?query=$1&tags=story

triggers startend => "glassdoor";

handle remainder => sub {

    return $_ if $_;
    return;
};

1;
