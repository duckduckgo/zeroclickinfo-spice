package DDG::Spice::Packagist;
# ABSTRACT: Returns package information from packagist package manager's registry

use strict;
use DDG::Spice;

spice is_cached => 1;

# Triggers
triggers startend => 'packagist', 'composer package', 'composer packages', 'php composer', 'composer install';

spice to => 'https://packagist.org/search.json?q=$1';
spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return $_ if length $_;

    return;
};

1;
