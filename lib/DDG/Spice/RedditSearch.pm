package DDG::Spice::RedditSearch;

use DDG::Spice;

name "Reddit Search";
description "Search Reddit posts";
source "Reddit";
primary_example_queries "reddit baking";
attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];
category "forums";
topics "geek", "social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RedditSearch.pm";
icon_url "/i/www.reddit.com.ico";
status "enabled";

triggers any => "reddit";
spice to => 'http://www.reddit.com/search.json?q=$1&restrict_sr=true&sort=relevance&jsonp=ddg_spice_reddit';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
