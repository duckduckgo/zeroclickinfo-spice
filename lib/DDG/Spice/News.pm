package DDG::Spice::News;
# ABSTRACT: Show current news from different sources.

use strict;
use DDG::Spice;

primary_example_queries "news america", "obama news", "internet news";
description "Shows the current news about a topic.";
name "News";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/News.pm";
topics "everyday";
category "time_sensitive";
attribution github => ["https://github.com/duckduckgo/", "DuckDuckGo"],
            twitter => ["https://twitter.com/duckduckgo", "DuckDuckGo"];

triggers startend => "news";
spice to => 'https://duckduckgo.com/news.js?q=$1&cb={{callback}}';

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
