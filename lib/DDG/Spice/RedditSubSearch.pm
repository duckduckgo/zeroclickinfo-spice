package DDG::Spice::RedditSubSearch;
# ABSTRACT: Search for subreddits

use strict;
use DDG::Spice;

triggers start => 'r';
triggers startend => 'subreddit';

spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle query_lc => sub {
    return unless $_ =~ qr#^(?:subreddit|/r/)\s*(?<match>\w+)$|^(?<match>\w+)\s+subreddit$#i;
    return $+{match};
};

1;
