package DDG::Spice::RedditSubSearch;

use DDG::Spice;

triggers query_lc => qr#^(?:subreddit|/r/|r/)\s*(?:/r/|r/)*(\w+)\s*$#i;
spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle matches => sub {
    my ($rname) = @_;
    return $rname if $rname;
    return;
};

1;
