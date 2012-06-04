package DDG::Spice::RedditSearch;

use DDG::Spice;

#triggers query_lc => qr#^(?:reddit|subreddit|/?r/)\s*(?:/?r/)?(\w+)\s+(\w*)#i;
triggers query_lc =>
    #qr#^(?:reddit|subreddit)?\s*(?:/?r/)?(\w+)\s+(\w*)#i;
    qr#^(?:reddit|subreddit)?(?:\s*/?r/(\w+))?\s+(\w*)#i;
spice to => 'http://www.reddit.com/r/$1/search.json?restrict_sr=true&q=$2&sort=relevance&jsonp=ddg_spice_reddit';
spice from => '(?:([^~*)~~~([^~]*))';

handle matches => sub {
    return $_[0] . '~~~' . $_[1] unless not $_[1];
    return '' . '~~~' . $_[0];
};

1;
