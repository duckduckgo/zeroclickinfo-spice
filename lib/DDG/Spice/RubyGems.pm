package DDG::Spice::RubyGems;
# ABSTRACT: Search for RubyGems

use strict;
use DDG::Spice;

triggers startend => 'rubygem', 'rubygems', 'ruby gems', 'ruby gem', 'ruby install', 'gem install', 'gem';
spice to => 'https://rubygems.org/api/v1/search.json?query=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if length $_;
    return;
};

1;
