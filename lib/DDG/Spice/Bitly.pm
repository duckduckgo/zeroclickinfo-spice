package DDG::Spice::Bitly;
# ABSTRACT: Return a shortened version of a URL using the bitly API.

use DDG::Spice;

primary_example_queries "bitly http://www.example.com/long/url";
secondary_example_queries "shorten http://www.example.com/long/url", "url shorten www.example.com/long/url";
description "Shorten URLs using the bitly API";
name "Bitly";
icon_url "/i/bitly.com.ico";
source "Bitly";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bitly.pm";
topics "social";
category "computing_tools";
attribution github => ['https://github.com/danjarvis','Dan Jarvis'],
            twitter => ['http://twitter.com/danjarvis','danjarvis'];

spice to => 'http://api.bitly.com/v3/shorten?login=ddgspiceplugin&apiKey={{ENV{DDG_SPICE_BITLY_APIKEY}}}&longUrl=$1&callback={{callback}}';

triggers start => 'bitly', 'bit.ly', 'shorten', 'shorten url', 'short url', 'url shorten';

handle remainder => sub {
	my ($longUri) = shift;
	if ($longUri) {
		if (!($longUri =~ /^https?:\/\//)) {
			$longUri = 'http://' . $longUri;
		}
		return $longUri;
	}
	return;
};

1;
