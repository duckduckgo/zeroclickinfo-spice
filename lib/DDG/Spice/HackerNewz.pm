package DDG::Spice::HackerNewz;

# ABSTRACT: Serach for Hacker Newz

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1;

spice to => 'https://hn.algolia.com/api/v1/search?query=$1&tags=story';

triggers any => 'hacker newz';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
