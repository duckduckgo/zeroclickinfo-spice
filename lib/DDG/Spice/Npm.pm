package DDG::Spice::Npm;
# ABSTRACT: Search npm for package information

use strict;
use DDG::Spice;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

triggers startend => 'npm', 'npm node', 'node npm', 'node package';
triggers start => 'npm install', 'node install';

spice to => 'https://api.npms.io/v2/search?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return $_ if $_;
    return;
};

1;
