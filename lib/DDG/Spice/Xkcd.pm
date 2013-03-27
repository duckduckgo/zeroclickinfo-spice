package DDG::Spice::Xkcd;

use DDG::Spice;

name "xkcd";
description "Get the latest xkcd comic";
source "xkcd";
primary_example_queries "xkcd";
secondary_example_queries "xkcd 102";
category "special";
topics "entertainment", "geek", "special_interest";
icon_url "/i/xkcd.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Xkcd.pm";
attribution github => ["https://github.com/sdball", "Stephen Ball"],
		twitter => ["https://twitter.com/StephenBallNC", "StephenBallNC"];
status "enabled";


triggers startend => "xkcd";

spice to => 'http://dynamic.xkcd.com/api-0/jsonp/comic/$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {

	if ($_ =~ /^(\d+|r(?:andom)?)$/) {
		return int rand 1122 if $1 =~ /r/;
		return $1;
	}

	return '' if $_ eq '';
	return;
};

1;