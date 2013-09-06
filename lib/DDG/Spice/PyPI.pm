package DDG::Spice::PyPI;

use DDG::Spice;

name 'Python Packages';
description 'Returns a list of matching python packages in pypi.python.org';
primary_example_queries 'pip django';
topics 'programming';
category 'programming';
attribution github => ['https://github.com/djinn', 'djinn'],
            twitter => ['https://twitter.com/djinn', 'djinn'];

triggers startend => 'python', 'pip', 'easy_install', 'egg', 'pythonegg';
spice to => 'https://rubygems.org/api/v1/search.json?query=$1&callback={{callback}}';
spice wrap_jsonp_callback => 1;

spice is_cached => 1;

handle remainder => sub {
    s/^\s+//;
    s/\s+$//;
    return $_ if length $_;
    return;
};

1;
