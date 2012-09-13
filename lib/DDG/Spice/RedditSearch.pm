package DDG::Spice::RedditSearch;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers query_lc => qr#^(reddit|subreddit|/?r/)\s*(?:/?r/)?(\w+)?\s+(.*)#i;
spice to => 'http://www.reddit.com/r/$1/search.json?q=$2&restrict_sr=$3&sort=relevance&jsonp=ddg_spice_reddit';
spice from => '(?:([^/]*)/([^/]*)/(true|false))';

handle matches => sub {
    if ($_[0] eq 'subreddit') {
        return $_[1], $_[2], 'true' if $_[1];
        return;
    } elsif ($_[0] eq 'reddit') {
        return 'duckduckgo', $_[2], 'false';
    } else {
        return $_[1], $_[2], 'true';
        return;
    }
};

1;
