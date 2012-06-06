package DDG::Spice::RedditSearch;

use DDG::Spice;

triggers query_lc => qr#^(reddit|subreddit|/?r/)\s*(?:/?r/)?(\w+)?\s+(.*)#i;
spice to => 'http://www.reddit.com/r/$1/search.json?q=$2&restrict_sr=$3&sort=relevance&jsonp=ddg_spice_reddit';
spice from => '(?:([^/]*)/([^/]*)/(true|false))';

handle matches => sub {
    return $_[1], $_[2], 'true' unless $_[0] eq "reddit"; #want it if subreddit or /?/r, don't want if "reddit"
    return 'duckduckgo', $_[1] . " " . $_[2], 'false' if defined $_[1];
    return 'duckduckgo', $_[2], 'false';
};

1;
