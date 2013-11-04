package DDG::Spice::RubyGems;

use DDG::Spice;

name 'RubyGems';
description 'Returns a list of matching ruby packages in rubygems.org';
primary_example_queries 'rubygems cucumber';
topics 'programming';
category 'programming';
attribution github => ['https://github.com/koosha--', 'koosha--'],
            twitter => ['https://github.com/_koosha_', '_koosha_'];

triggers startend => 'ruby', 'gem', 'gems', 'rubygem', 'rubygems';
spice to => 'http://rubygems.org/api/v1/search.json?query=$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    s/^\s+//;
    s/\s+$//;
    return $_ if length $_;
    return;
};

1;
