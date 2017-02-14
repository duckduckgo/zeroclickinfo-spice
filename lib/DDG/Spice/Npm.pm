package DDG::Spice::Npm;
# ABSTRACT: Search npm for package information

use strict;
use DDG::Spice;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

triggers startend => 'npm', 'nodejs', 'node package';
triggers start => 'npm install';

spice to => 'http://npmsearch.com/query?q=$1&fields=name,description,repository,homepage,author,rating,version';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return $_ if $_;
    return;
};

1;
