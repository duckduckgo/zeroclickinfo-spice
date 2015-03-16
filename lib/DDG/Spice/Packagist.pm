package DDG::Spice::Packagist;
# ABSTRACT: Returns package information from packagist package manager's registry

use strict;
use DDG::Spice;

spice is_cached => 1;

# Metadata.
name "Packagist";
source "packagist";
icon_url "https://packagist.org/favicon.ico";
description "Shows an packagist composer package";
primary_example_queries "packagist laravel", "composer laravel";
secondary_example_queries "laravel composer", "laravel packagist";
topics "sysadmin", "programming";
category "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Packagist.pm";
attribution github => ["https://github.com/somus", "Somasundaram Ayyappan"],
            twitter => ["https://twitter.com/_somu_", "Somasundaram Ayyappan"];

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
