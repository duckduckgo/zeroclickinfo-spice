package DDG::Spice::Npm;
# ABSTRACT: Returns package information from npm package manager's registry.

use strict;
use DDG::Spice;

triggers startend => 'npm', 'nodejs';
triggers start => 'npm install';

spice to => 'http://registry.npmjs.org/$1/latest';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return $_ if $_;
    return;
};

1;
