package DDG::Spice::RedditUserSearch;

use DDG::Spice;

name "Reddit User Search";
description "search for reddit users";
source "Reddit";
primary_example_queries "reddit user alienth";
category "forums";
topics "social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RedditUserSearch.pm";
icon_url "/i/www.reddit.com.ico";
attribution github => ["https://github.com/samph", "samph"];

triggers startend => 'reddit user';

spice to => 'https://www.reddit.com/user/$1/about.json?jsonp=ddg_spice_reddit_user_search';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
