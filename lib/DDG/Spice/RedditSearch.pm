package DDG::Spice::RedditSearch;

use DDG::Spice;

triggers query_lc => qr#^(?:reddit|subreddit|/?r/)\s*(?:/?r/)?(\w+)?\s+(.*)#i;
spice to => 'http://www.reddit.com/r/$1/search.json?q=$2&restrict_sr=$3&sort=relevance&jsonp=ddg_spice_reddit';
spice from => '(?:([^/]*)/([^/]*)/(true|false))';

handle matches => sub {
    return $_[0], $_[1], 'true' if defined $_[0];
    return 'duckduckgo', $_[1], 'false';
};

1;
