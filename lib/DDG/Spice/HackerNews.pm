package DDG::Spice::HackerNews;
# ABSTRACT: Search for Hacker News

use strict;
use DDG::Spice;

triggers startend => "hn", "hackernews", "hacker news", "news.yc", "news.ycombinator.com", "hn search", "hnsearch", "hacker news search", "hackernews search";

spice to => 'https://hn.algolia.com/api/v1/search?query=$1&tags=story';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
