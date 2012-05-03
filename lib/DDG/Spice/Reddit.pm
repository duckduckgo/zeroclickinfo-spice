package DDG::Spice::Reddit;

use DDG::Spice;

triggers start => '/r/', 'r/', 'reddit', 'subreddit';

spice to => "http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit";

handle query_lc => sub {
    if ($_ =~ /^(reddit|subreddit)\s+(\w+)$/i || $_ =~ /^(\/?r\/)+(\w+)$/) {
        return $1 if $1;
}
    return;
};

1;
