package DDG::Spice::RedditSearch;
# ABSTRACT: Search for Reddit

use strict;
use DDG::Spice;

triggers any => "reddit";
spice to => 'http://www.reddit.com/search.json?q=$1&restrict_sr=true&sort=relevance&jsonp=ddg_spice_reddit';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
