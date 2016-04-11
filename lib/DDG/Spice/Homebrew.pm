package DDG::Spice::Homebrew;
# ABSTRACT: Returns formula information from Homebrew formulas index (http://brewformulas.org).

use strict;
use DDG::Spice;

triggers startend => 'brew', 'homebrew';
triggers start => 'brew install';

spice to => 'http://brewformulas.org/$1.json';
spice proxy_cache_valid => '200 30d';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
