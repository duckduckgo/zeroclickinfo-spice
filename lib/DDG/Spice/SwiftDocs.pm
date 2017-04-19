package DDG::Spice::SwiftDocs;

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; 

spice wrap_jsonp_callback => 1; 

spice to => 'http://api.swiftdoc.org/search?q=$1';

triggers any => 'swift', 'swift docs', 'swiftdoc', 'swift doc';

handle remainder => sub {
    return lc $_ if $_;
    return;
};

1;
