package DDG::Spice::RedditSubSearch;

use DDG::Spice;

name "SubReddit Search";
description "search for subreddits";
source "Reddit";
primary_example_queries "subreddit pizza", "/r/games";
secondary_example_queries "r/ accounting";
category "forums";
topics "social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RedditSubSearch.pm";
icon_url "/i/www.reddit.com.ico";
attribution twitter => ["https://twitter.com/mithrandiragain","mithrandiragain"],
            github => ["https://github.com/MithrandirAgain", "Gary Herreman"],
            web => ['http://atomitware.tk/mith','MithrandirAgain'];

triggers query_lc => qr#^(?:subreddit|/?r/)\s*(\w+)$|^(\w+)\s+subreddit$#i;
spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle matches => sub {
	if($1) {
		return $1;
	} elsif($2) {
		return $2;
	}
    return;
};

1;
