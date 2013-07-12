package DDG::Spice::Shorten;
# ABSTRACT: Return a shortened version of a URL using the bitly API.

use DDG::Spice;

primary_example_queries "shorten http://www.duckduckgo.com/about.html";
secondary_example_queries "url shorten www.github.com/explore";
description "Shorten URLs using the is.gd API";
name "Shorten";
icon_url "/i/bitly.com.ico";
source "Shorten";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Shorten.pm";
topics "social";
category "computing_tools";
attribution github => ['https://github.com/danjarvis','Dan Jarvis'],
            twitter => ['http://twitter.com/danjarvis','danjarvis'];

spice to => 'http://is.gd/create.php?format=json&url=$1&callback={{callback}}';
triggers any => 'shorten', 'shorten url', 'short url', 'url shorten';

handle remainder => sub {
	my ($longUri) = shift;

    return $longUri if $longUri;
	return;
};

1;
