package DDG::Spice::RubyGems;
# ABSTRACT: Search for RubyGems

use strict;
use DDG::Spice;

name 'RubyGems';
description 'Returns a list of matching ruby packages in rubygems.org';
primary_example_queries 'rubygems cucumber';
topics 'programming';
category 'programming';
attribution github => ['https://github.com/koosha--', 'koosha--'],
            twitter => ['https://twitter.com/_koosha_', 'koosha--'];

triggers startend => 'rubygem', 'rubygems', 'ruby gems', 'ruby gem', 'gem install', 'gem';
spice to => 'https://rubygems.org/api/v1/search.json?query=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
