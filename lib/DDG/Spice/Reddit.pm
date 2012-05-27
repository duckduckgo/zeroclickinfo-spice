package DDG::Spice::Reddit;

use DDG::Spice;

triggers query_lc => qr#^(?:reddit|subreddit|/r/|r/)\s*(?:/r/|r/)*(\w+)|subreddit\s+(\w+)#i;
spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle matches => sub {
    my ($rname) = @_;
    return $rname if $rname;
    return;
};

1;
