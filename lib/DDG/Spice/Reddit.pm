package DDG::Spice::Reddit;

use DDG::Spice;

triggers start => '/r/', 'r/', 'reddit', 'subreddit';

spice to => "http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit", "http://www.reddit.com/r/$1/.json?jsonp=link_parse&limit=1";

handle query_lc => sub {
    if ($_ =~ /^(reddit|subreddit)\s+(\w+)$/i || $_ =~ /^(\/?r\/)+(\w+)$/) {
        return $1 if $1;
}
    return;
};

1;
