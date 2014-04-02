package DDG::Spice::HackerNews;

use DDG::Spice;

primary_example_queries "hn postgresql";
description "Search the Hacker News database for related stories/comments";
name "HackerNews";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/HackerNews.pm";
icon_url "/i/www.hnsearch.com.ico";
topics "programming", "social";
category "forums";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];

triggers startend => "hn", "hackernews", "hacker news", "news.yc", "news.ycombinator.com", "hn search", "hnsearch", "hacker news search", "hackernews search";

spice to => 'https://hn.algolia.com/api/v1/search?query=$1&tags=story';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
