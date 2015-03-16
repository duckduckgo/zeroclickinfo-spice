package DDG::Spice::RedditSubSearch;

use strict;
use DDG::Spice;

name "SubReddit Search";
description "search for subreddits";
source "Reddit";
primary_example_queries "subreddit pizza", "/r/games";
secondary_example_queries "r/accounting";
category "forums";
topics "social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/RedditSubSearch.pm";
icon_url "/i/www.reddit.com.ico";
attribution twitter => ["https://twitter.com/mithrandiragain","Gary Herreman"],
            github => ["https://github.com/MithrandirAgain", "Gary Herreman"],
            web => ['http://atomitware.tk/mith','Gary Herreman'];

triggers startend => 'subreddit', 'r';

spice to => 'http://www.reddit.com/r/$1/about.json?jsonp=ddg_spice_reddit';

handle query_lc => sub {

	$_ =~ s/^(subreddit|r)|(subreddit|r)$//i;
	$_ =~ s/\// /g;
	$_ =~ s/ //g;

	return $_ if $_;
	return unless $_ =~ qr#^(?:subreddit|/?r/?)\s*(\w+)$|^(\w+)\s+subreddit$#i;

	if ($1) {
		return $1;
	}
	return $2;

};

1;
