package DDG::Spice::Octopart;
# ABSTRACT: Search for electronic parts

use strict;
use DDG::Spice;

triggers any => "datasheet", "specs", "octopart";

spice to => 'http://octopart.com/api/v3/parts/search?apikey={{ENV{DDG_SPICE_OCTOPART_APIKEY}}}&limit=12&q=$1&include[]=datasheets&include[]=avg_price_v2&include[]=market_status_v2&include[]=imagesets&include[]=short_description&callback={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};
1;
