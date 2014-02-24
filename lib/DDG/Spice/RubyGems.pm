package DDG::Spice::RubyGems;

use DDG::Spice;

name 'RubyGems';
description 'Returns a list of matching ruby packages in rubygems.org';
primary_example_queries 'rubygems cucumber';
topics 'programming';
category 'programming';
attribution github => ['https://github.com/koosha--', 'koosha--'],
            twitter => ['https://github.com/_koosha_', '_koosha_'];

triggers startend => 'rubygem', 'rubygems', 'ruby gems', 'ruby gem', 'gem install';
spice to => 'http://rubygems.org/api/v1/search.json?query=$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
