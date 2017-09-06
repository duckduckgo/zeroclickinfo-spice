package DDG::Spice::Cookbooks;
# ABSTRACT: Returns cookbook information from supermarket API.

use strict;
use DDG::Spice;

triggers startend => 'cookbook', 'cookbooks', 'chef';
triggers start => 'chef install';

spice to => 'https://supermarket.chef.io/api/v1/cookbooks/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
