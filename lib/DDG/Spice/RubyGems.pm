package DDG::Spice::RubyGems;

use DDG::Spice;

triggers startend => 'ruby', 'gem', 'gems', 'rubygem', 'rubygems';
spice to => 'https://rubygems.org/api/v1/search.json?query=$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;
description 'Returns a list of matching ruby packages in rubygems.org';
primary_example_queries 'rubygems cucumber';
topics 'programming';
category 'programming';
attribution github => ['https://github.com/koosha--', 'koosha--'],
            twitter => '_koosha_';
spice is_cached => 1;

handle remainder => sub {
    s/^\s+|\s+$//g;
    return $_ if length $_;
    return;
};

1;
